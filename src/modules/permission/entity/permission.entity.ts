import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../role/entity/role.entity';

@Entity('permission')
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 18 })
  name: string;

  @ManyToMany(type => Role, role => role.permissions)
  roles: Role[];
}
