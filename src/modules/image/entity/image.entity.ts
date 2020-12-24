import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('image')
export class Image extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdDate: Date;

  @Column('varchar')
  name: string;

  @Column('varchar')
  contentType: string;

  @Column('longblob')
  data: Buffer;

}
