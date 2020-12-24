import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageRepository } from './image.repository';
import { MulterModule } from '@nestjs/platform-express';
import { extname } from 'path'

const imageFilter = function (req, file, cb) {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
  }
  cb(null, true);
};

@Module({
  imports: [
    TypeOrmModule.forFeature([ImageRepository]),
    MulterModule.registerAsync({
      useFactory: () => ({
        fileFilter: imageFilter
      }),
    }),
  ],
  providers: [ImageService],
  controllers: [ImageController]
})
export class ImageModule {
}
