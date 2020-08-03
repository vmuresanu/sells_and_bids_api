import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Permission } from '../../permission/entity/permission.entity';
import { User } from '../../user/entity/user.entity';

@Entity('role')
@Unique(['name'])
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 18 })
  name: string;

  @OneToMany(type => Permission, permission => permission.role)
  permissions: Permission[];

  @ManyToMany(type => User, user => user.roles)
  users: User[];
}
