import { InputType, Field, Float } from '@nestjs/graphql';
import { DocumentType } from '../entities/user.entity';

@InputType()
export class CreateUserInput {
  @Field()
  user_name: string;

  @Field()
  password: string;

  @Field()
  second_name: string;

  @Field()
  last_name: string;

  @Field()
  second_last_name: string;

  @Field(() => DocumentType)
  document_type: DocumentType;

  @Field()
  document_number: string;

  @Field()
  personal_email: string;

  @Field()
  institutional_email: string;

  @Field()
  phone_number: string;

  @Field()
  address: string;

  @Field()
  city: string;

  @Field()
  country: string;

  @Field()
  sucursal: string;

  @Field()
  cargo: string;

  @Field()
  fecha_nacimiento: string;

  @Field()
  fecha_vinculacion: string;

  @Field()
  rol: string;

  @Field()
  estado: string;

  @Field({ nullable: true })
  last_login?: Date;

  @Field()
  created_by: string;

  @Field()
  updated_by: string;

  @Field({ nullable: true })
  deleted_by?: string;

  @Field({ nullable: true })
  deleted_at?: Date;

  @Field(() => Float)
  salary: number;
}
