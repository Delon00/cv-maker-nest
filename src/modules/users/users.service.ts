import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from '@prisma/client';
import { UtilsService } from '../../shared/shared.service';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService,
        private userUtilsService: UtilsService,
    ) {}

    async create(dto: CreateUserDto): Promise<User> {
        return this.userUtilsService.createUser(dto);
    }

    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async findOne(id: string): Promise<User> {
        const user = await this.prisma.user.findUnique({
        where: { id },
        });

        if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
        }

        return user;
    }

    async update(id: string, dto: UpdateUserDto): Promise<User> {
        await this.findOne(id);
        return this.prisma.user.update({
        where: { id },
        data: dto,
        });
    }

    async remove(id: string): Promise<User> {
        await this.findOne(id);
        return this.prisma.user.delete({
        where: { id },
        });
    }
}
