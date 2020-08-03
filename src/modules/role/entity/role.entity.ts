import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { hash } from 'bcryptjs';

@Entity('rule')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 18 })
  name: string;

  @OneToMany(type => Permission, permission => permission.rule)
  permissions: Permission[];
}
