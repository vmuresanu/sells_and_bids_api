import { IsBase64, IsString } from 'class-validator';

export class ImageRequest {

  @IsString()
  name: string;

  @IsBase64()
  data: Buffer;

  @IsString()
  contentType: string;

}
