import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user_role')
export class RoleEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  role: string;
}
