import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
        jwtFromRequest: ExtractJwt.fromExtractors([
            (request: Request) => {
            let data = null;
            if (request && request.cookies) {
                data = request.cookies['access_token'];
            }
            return data;
            },
        ]),
        ignoreExpiration: false,
        signOptions: { expiresIn: '240m' },
        secretOrKey: process.env.JWT_SECRET || 'SECRET_KEY',
        });
    }

    async validate(payload: any) {
        return { userId: payload.userId, email: payload.email, plan: payload.plan };
    }
}