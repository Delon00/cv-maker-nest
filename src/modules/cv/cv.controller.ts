import {Controller,Get,Post,Body,Param,Delete,Put,UseGuards,Req,ParseUUIDPipe,Request, UnauthorizedException} from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto, UpdateCvDto } from './cv.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('cvs')
@UseGuards(JwtAuthGuard)

export class CvController {
    constructor(private readonly cvService: CvService) {}


    @Post()
    async create(@Body() createCvDto: CreateCvDto, @Request() req) {
        const userId = req.user?.userId;
        if (!userId) {
            throw new UnauthorizedException('User ID missing from token');
        }
        return this.cvService.create(userId, createCvDto);
    }

    
    @Get()
    findAll(@Req() req) {
        return this.cvService.findAllByUser(req.user.id);
    }
    
    @Get(':id')
    findOne(@Req() req, @Param('id', ParseUUIDPipe) id: string) {
        return this.cvService.findOneByUser(id, req.user.id);
    }

    @Get('/by-name/:cvName')
    getByName(@Req() req, @Param('cvName') cvName: string) {
        const userId = req.user?.id;
        if (!userId) {
        throw new UnauthorizedException('User ID missing from token');
        }
        return this.cvService.findByName(cvName, userId);
    }

    @Put(':id')
    update(
        @Req() req,
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateCvDto: UpdateCvDto,
    ) {
        return this.cvService.update(id, req.user.id, updateCvDto);
    }
    
    @Delete(':id')
    remove(@Req() req, @Param('id', ParseUUIDPipe) id: string) {
        return this.cvService.remove(id, req.user.id);
    }


}
