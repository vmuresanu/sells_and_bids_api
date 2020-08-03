import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Permission } from '../../permission/entity/permission.entity';
import { User } from '../../user/entity/user.entity';

@Entity('role')
@Unique(['name'])
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 18 })
  name: string;

  @ManyToMany(type => Permission, permission => permission.roles)
  @JoinTable({
    name: 'role_permission',
    joinColumns: [
      { name: 'role_id' }
    ],
    inverseJoinColumns: [
      { name: 'permission_id' }
    ]
  })
  permissions: Permission[];

  @ManyToMany(type => User, user => user.roles)
  users: User[];
}
