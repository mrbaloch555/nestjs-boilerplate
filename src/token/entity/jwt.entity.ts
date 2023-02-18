import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tokens' })
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column({ nullable: false })
  expires: string;

  @Column({ enum: ['refresh', 'access'] })
  type: string;

  @Column({ default: false })
  blackListed: boolean;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  entity: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
