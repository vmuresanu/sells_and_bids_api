import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImageResponse } from './entity/image.response';
import { Response } from 'express';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('image')
export class ImageController {

  constructor(private imageService: ImageService) {
  }

  @Cron(CronExpression.EVERY_2ND_HOUR, { name: 'deleteOrphanImages' })
  async handleCron() {
    Logger.log('Starting to delete orphan images', 'Cron');
    const images = await this.imageService.findOrphans();
    const imageIds = images.map(i => i.id);
    if (!imageIds.length) {
      return;
    }
    return this.imageService.deleteByIds(imageIds);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('file'))
  async uploadImage(@UploadedFiles() files: Express.Multer.File[], @Body() body) {

    return await this.imageService.create(files, body);
  }

  @Get()
  async findAllImages() {

    return await this.imageService.findAll();
  }

  @Get(':id')
  async findImageById(@Res() res: Response, @Param('id') id: string) {
    const image: ImageResponse = await this.imageService.findById(id);
    res.setHeader('Content-Type', image.contentType);
    return res.send(image.data);
  }

  @Delete(':id')
  async deleteImageById(@Param('id') id: string) {

    return this.imageService.deleteById(id);
  }

}
