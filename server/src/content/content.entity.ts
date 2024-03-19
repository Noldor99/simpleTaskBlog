import { User } from 'src/user/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ContentVariant } from './type';

@Entity('content')
export class Content {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  router: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  text: string;

  @Column({ type: 'enum', enum: ContentVariant })
  variant: ContentVariant;

  @ManyToOne(() => User, (user) => user.contents)
  user: User;

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
