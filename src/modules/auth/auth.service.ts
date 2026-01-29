import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '@prisma/client';
import { UtilsService } from '../../shared/shared.service';
import * as bcrypt from 'bcrypt';
import { CookieOptions } from 'express'; // ⚠️ Nécessaire pour le typage

@Injectable()
export class AuthService {
    // Constante pour le nom du cookie (évite les fautes de frappe)
    public static readonly ACCESS_TOKEN_NAME = 'access_token';

    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly userUtilsService: UtilsService,
    ) {}

    // =================================================================
    // CONFIGURATION CENTRALE DES COOKIES
    // =================================================================
    public getCookieOptions(): CookieOptions {
        const isProduction = process.env.NODE_ENV === 'production';
        
        return {
        httpOnly: true,                 // Empêche l'accès via JS client (sécurité XSS)
        secure: isProduction,           // true en HTTPS uniquement
        sameSite: isProduction ? 'none' : 'lax', // 'none' nécessaire si frontend/backend sur domaines différents en prod
        path: '/',                      // INDISPENSABLE pour que le cookie soit accessible partout et supprimable
        maxAge: 24 * 60 * 60 * 1000,    // 1 jour
        };
    }

    // =================================================================
    // LOGIQUE MÉTIER
    // =================================================================

    private toEntity(user: any): Omit<User, 'password'> {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async register(data: RegisterDto): Promise<{ accessToken: string; user: Omit<User, 'password'> }> {
        const userExists = await this.prisma.user.findUnique({
            where: { email: data.email },
        });

        if (userExists) {
            throw new ConflictException('Cet email est déjà enregistré');
        }

        const user = await this.userUtilsService.createUser(data);

        const payload = { userId: user.id, email: user.email, plan: user.plan };
        const token = await this.jwtService.signAsync(payload);

        return {
            accessToken: token,
            user: this.toEntity(user),
        };
    }

    async login(data: LoginDto): Promise<{ accessToken: string; user: Omit<User, 'password'> }> {
        const user = await this.prisma.user.findUnique({
            where: { email: data.email },
        });

        if (!user || !(await bcrypt.compare(data.password, user.password))) {
            throw new UnauthorizedException('Email ou mot de passe incorrect');
        }

        const payload = { userId: user.id, email: user.email, plan: user.plan };
        const token = await this.jwtService.signAsync(payload);

        return {
            accessToken: token,
            user: this.toEntity(user),
        };
    }

    async logout(): Promise<void> {
        // Pas de logique métier complexe ici pour l'instant, 
        // le travail se fait surtout dans le controller pour supprimer le cookie.
        return;
    }
}