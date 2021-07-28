import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Auction } from '../../auction/entity/auction.entity';

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

  @ManyToOne((type) => Auction, (auction) => auction.images, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'auctionId', referencedColumnName: 'id' })
  auction: Auction;

  @Column({ type: 'decimal', nullable: true })
  orderIndex: number;
}
