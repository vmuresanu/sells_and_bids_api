import { Injectable } from '@nestjs/common';
import { ImageRepository } from './image.repository';
import { plainToClass } from 'class-transformer';
import { ImageRequest } from './entity/image.request';
import { Image } from './entity/image.entity';
import { ImageResponse } from './entity/image.response';
import { FilesNotSelectedException } from '../../shared/exceptions/file/file.exceptions';
import { ImageNotFoundException, ImagesNotFoundException } from '../../shared/exceptions/image/image.exceptions';
import { GROUPS } from '../../shared/constants/class-transformer';
import { In } from 'typeorm';

@Injectable()
export class ImageService {

  constructor(
    private imageRepository: ImageRepository,
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
    return this.imageRepository
      .find()
      .then((images: Image[]) => {
        return plainToClass(ImageResponse, images)
      });
  }

  async findById(id: string): Promise<ImageResponse> {
    return this.imageRepository
      .findOne({ where: { id } })
      .then((image: Image) => {
        return plainToClass(ImageResponse, image, { groups: [GROUPS.GET_ONE] });
      });
  }

  async findOrphans(): Promise<Image[]> {
    return this.imageRepository.find({ where: { auction: null } });
  }

  async findByIds(ids: string[]): Promise<Image[]> {
    if (!ids?.length) {
      return [];
    }
    const images = await this.imageRepository.find({ where: { id: In(ids) } });
    if (!images.length) {
      throw new ImagesNotFoundException();
    }
    return images;
  }

  async deleteById(id: string): Promise<void> {
    const image = await this.imageRepository.findOne({ where: { id } });
    if (!image) {
      throw new ImageNotFoundException();
    }
    await this.imageRepository.delete({ id });
  }

  async deleteByIds(ids: string[]): Promise<void> {
    const images: Image[] = await this.findByIds(ids);
    if (!images.length) {
      throw new ImagesNotFoundException();
    }
    await this.imageRepository.remove(images);
  }

}
