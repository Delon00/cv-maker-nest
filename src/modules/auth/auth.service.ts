import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '@prisma/client';
import { UtilsService } from '../../shared/shared.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly userUtilsService: UtilsService,
    ) {}

    private toEntity(user: any): Omit<User, 'password'> {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async register(data: RegisterDto): Promise<{ message: string; accessToken: string; user: Omit<User, 'password'> }> {
        const userExists = await this.prisma.user.findUnique({
            where: { email: data.email },
        });

        if (userExists) {
            throw new ConflictException('Email already registered');
        }

        const user = await this.userUtilsService.createUser(data);

        const payload = { sub: user.id, email: user.email, plan: user.plan};
        const token = await this.jwtService.signAsync(payload);

        return {
        message: 'User registered successfully',
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

        const payload = { sub: user.id, email: user.email, plan: user.plan };
        const token = await this.jwtService.signAsync(payload);

        return {
        accessToken: token,
        user: this.toEntity(user),
        };
    }

    async logout(): Promise<{ message: string }> {
        return { message: 'Successfully logged out' };
    }
}
