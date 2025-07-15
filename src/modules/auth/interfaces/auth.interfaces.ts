import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { User } from '@prisma/client';

export interface IAuthService {
    register(data: RegisterDto): Promise<User>;
    login(data: LoginDto): Promise<{ accessToken: string; user: User }>;
}
