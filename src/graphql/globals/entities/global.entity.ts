import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Global {

  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  name_company: string;
  
  @Field()
  @Column()
  logo_company: string;

  /*@Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;*/
}
