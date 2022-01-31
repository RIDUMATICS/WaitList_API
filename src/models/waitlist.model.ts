import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('WaitList')
export class WaitList {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  fullName!: string;

  @Column()
  @Index({ unique: true })
  email!: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ type: 'enum', enum: ['Investors', 'Asset listers'] })
  type!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
