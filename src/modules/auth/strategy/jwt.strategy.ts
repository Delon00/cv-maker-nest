import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            signOptions: { expiresIn: '60m' },
            secretOrKey: process.env.JWT_SECRET || 'SECRET_KEY',
        });
    }

    async validate(payload: any) {
        console.log('JwtStrategy payload:', payload);
        return { userId: payload.userId, email: payload.email, plan: payload.plan };
        
    }
}
