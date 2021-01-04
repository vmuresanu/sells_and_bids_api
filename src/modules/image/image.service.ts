import { Inject, Injectable } from '@nestjs/common';
import { ImageRepository } from './image.repository';
import { plainToClass } from 'class-transformer';
import { ImageRequest } from './entity/image.request';
import { Image } from './entity/image.entity';
import { ImageResponse } from './entity/image.response';
import { FilesNotSelectedException } from '../../shared/exceptions/file/file.exceptions';
import { ImageNotFoundException } from '../../shared/exceptions/image/image.exceptions';
import { GROUPS } from '../../shared/constants/class-transformer';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { In } from 'typeorm';

@Injectable()
export class ImageService {

  constructor(
    private imageRepository: ImageRepository,
    @Inject(REQUEST) private request: Request,
    ) {
  }

  async create(files: Express.Multer.File[], imageRequest: ImageRequest): Promise<ImageResponse[]> {
    if (!files.length) {
      throw new FilesNotSelectedException();
    }
    let newImages: ImageRequest[] = [];
    files.forEach(file => {
      const newImage = this.imageRepository.create(imageRequest);
      newImage.data = file.buffer;
      newImage.name = file.originalname;
      newImage.contentType = file.mimetype;
      newImages.push(newImage);
    });

    return this.imageRepository
      .save(newImages)
      .then((images: Image[]) => {
        return plainToClass(ImageResponse, images);
      });
  }

  async findAll(): Promise<ImageResponse[]> {
    const images = await this.imageRepository.find();
    const mappedImages = await Promise.all(images.map(image => ({...image, url: `http://${this.request.get('host')}/image/${image.id}`})));
    return plainToClass(ImageResponse, mappedImages);
  }

  async findById(id: string): Promise<ImageResponse> {
    return this.imageRepository
      .findOne({ where: { id } })
      .then((image: Image) => {
        return plainToClass(ImageResponse, image, { groups: [GROUPS.GET_ONE] });
      });
  }

  async findByIds(ids: string[]): Promise<Image[]> {
    return this.imageRepository.find({ where: { id: In(ids) } })
  }

  async deleteById(id: string): Promise<void> {
    const image = await this.imageRepository.findOne({ where: { id } });
    if (!image) {
      throw new ImageNotFoundException();
    }
    await this.imageRepository.delete({ id });
  }
}
