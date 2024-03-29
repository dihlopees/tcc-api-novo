import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('roles')
export class RoleEntity {
  @Column()
  id: number;

  @PrimaryColumn()
  role: string;
}
