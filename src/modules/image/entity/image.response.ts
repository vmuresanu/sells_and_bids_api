import { Expose, Transform } from 'class-transformer';
import dayjs from 'dayjs';
import { GROUPS } from '../../../shared/constants/class-transformer';

export class ImageResponse {

  id: string;
  name: string;

  @Transform(value => dayjs(value).format('YYYY-MM-DD'))
  createdDate: string;

  @Expose({ groups: [GROUPS.GET_ONE] })
  data: Buffer;

  contentType: string;

  url: string;

}
