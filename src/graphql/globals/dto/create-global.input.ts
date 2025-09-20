import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGlobalInput {

@Field()
name_company: string;

@Field()
logo_company: string;

  /*@Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;*/
}
