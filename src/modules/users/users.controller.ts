import { Controller, Get, Post, Body, Param, Put, Delete,UseGuards  } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from '@prisma/client';
import { AdminGuard } from '../admin/admin.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    @UseGuards(AdminGuard)
    @Post()
    async create(@Body() dto: CreateUserDto): Promise<User> {
        return this.usersService.create(dto);
    }
    @UseGuards(AdminGuard)
    @Get('all')
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User> {
        return this.usersService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<User> {
        return this.usersService.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<User> {
        return this.usersService.remove(id);
    }
}
