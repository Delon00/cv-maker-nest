import { Injectable } from '@nestjs/common';
import { PrismaService } from '../modules/prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UtilsService {
    constructor(private prisma: PrismaService) {}

    async createUser(data: {
        email: string;
        password: string;
        firstName?: string;
        lastName?: string;
    }): Promise<User> {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return this.prisma.user.create({
        data: {
            email: data.email,
            password: hashedPassword,
            firstName: data.firstName,
            lastName: data.lastName,
        },
        });
    }
}
