import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity, JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { hash } from 'bcryptjs';
import { Role } from '../../role/entity/role.entity';

@Entity('user')
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdDate: Date;

  @Column('varchar', { length: 18 })
  username: string;

  @Column({ type: 'text' })
  password: string;

  @ManyToMany(type => Role, role => role.users)
  @JoinTable({
    name: 'user_role',
    joinColumns: [
      { name: 'user_id' }
    ],
    inverseJoinColumns: [
      { name: 'role_id' }
    ]
  })
  roles: Role[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
