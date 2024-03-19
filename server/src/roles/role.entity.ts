import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';


@Entity({ name: 'role' })
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'ADMIN', description: 'Unique role meaning' })
  @Column({ unique: true, nullable: false })
  value: string;

  @ApiProperty({ example: 'Administrator', description: 'Role description' })
  @Column({ nullable: false })
  description: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
