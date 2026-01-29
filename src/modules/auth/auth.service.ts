import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '@prisma/client';
import { UtilsService } from '../../shared/shared.service';
import * as bcrypt from 'bcrypt';
import { CookieOptions } from 'express';

@Injectable()
export class AuthService {
    public static readonly ACCESS_TOKEN_NAME = 'access_token';

    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly userUtilsService: UtilsService,
    ) {}

    // =================================================================
    // CONFIGURATION DYNAMIQUE DES COOKIES
    // =================================================================
    /**
     * Génère les options du cookie.
     * @param isRememberMe Si true, le cookie dure 30 jours, sinon 1 jour.
     */
    public getCookieOptions(isRememberMe: boolean = false): CookieOptions {
        const isProduction = process.env.NODE_ENV === 'production';
        
        const maxAge = isRememberMe 
        ? 30 * 24 * 60 * 60 * 1000 // 30 jours
        : 24 * 60 * 60 * 1000;     // 1 jour (défaut)

        return {
        httpOnly: true,                // Sécurité XSS
        secure: isProduction,          // HTTPS requis en production
        sameSite: isProduction ? 'none' : 'lax',
        path: '/',                     // Valide sur tout le site
        maxAge: maxAge,                // Durée dynamique
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
        const token = await this.jwtService.signAsync(payload, { expiresIn: '1d' });

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
        const expiresIn = data.rememberMe ? '30d' : '1d';
        const token = await this.jwtService.signAsync(payload, { expiresIn });

        return {
        accessToken: token,
        user: this.toEntity(user),
        };
    }

    async logout(): Promise<void> {
        return;
    }
}