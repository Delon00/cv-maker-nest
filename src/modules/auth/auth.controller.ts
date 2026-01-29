import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Res, Req, Get } from '@nestjs/common';
import { Response, Request } from 'express'; 
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ActiveUser } from './interfaces/activeUser.interface';

interface RequestWithUser extends Request {
    user: ActiveUser;
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getProfile(@Req() req: RequestWithUser) {
        return req.user;
    }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) response: Response) {
        const result = await this.authService.register(dto);
        
        response.cookie(
            AuthService.ACCESS_TOKEN_NAME, 
            result.accessToken, 
            this.authService.getCookieOptions(false) 
        );

        return result.user;
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() dto: LoginDto, @Res({ passthrough: true }) response: Response) {
        const result = await this.authService.login(dto);

        const cookieOptions = this.authService.getCookieOptions(dto.rememberMe);

        response.cookie(
            AuthService.ACCESS_TOKEN_NAME, 
            result.accessToken, 
            cookieOptions
        );

        return { user: result.user };
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@Res({ passthrough: true }) response: Response) {
        await this.authService.logout();
        
        const { maxAge, ...optionsWithoutMaxAge } = this.authService.getCookieOptions();
        
        response.clearCookie(AuthService.ACCESS_TOKEN_NAME, optionsWithoutMaxAge);
        
        return { message: 'Déconnecté avec succès' };
    }
}