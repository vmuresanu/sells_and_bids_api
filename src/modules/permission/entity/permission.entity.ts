import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../role/entity/role.entity';

@Entity('permission')
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 18 })
  name: string;

  @ManyToOne(type => Role, role => role.permissions)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role: Role;
}
