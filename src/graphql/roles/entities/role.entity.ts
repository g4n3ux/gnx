import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('roles')
export class Role {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()        
  @Column({ unique: true })
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field()      
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => User, user => user.roles)
  users: User[];
}
