import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';

// definimos el enum
export enum DocumentType {
  CC = 'CC',
  DNI = 'DNI',
  PASSPORT = 'PASSPORT',
}

// registramos el enum para GraphQL
registerEnumType(DocumentType, {
  name: 'DocumentType',
  description: 'Tipo de documento permitido',
});

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  user_name: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column()
  second_name: string;

  @Field()
  @Column()
  last_name: string;

  @Field()
  @Column()
  second_last_name: string;

  @Field(() => DocumentType) // enum en GraphQL
  @Column({ type: 'enum', enum: DocumentType })
  document_type: DocumentType;

  @Field()
  @Column()
  document_number: string;

  @Field()
  @Column()
  personal_email: string;

  @Field()
  @Column()
  institutional_email: string;

  @Field()
  @Column()
  phone_number: string;

  @Field()
  @Column()
  address: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  country: string;

  @Field()
  @Column()
  sucursal: string;

  @Field()
  @Column()
  cargo: string;

  @Field()
  @Column()
  fecha_nacimiento: string;

  @Field()
  @Column()
  fecha_vinculacion: string;

  @Field()
  @Column()
  estado: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp' }) // automática al crear
  created_at: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp' }) // automática al actualizar
  updated_at: Date;

  @Field({ nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  last_login: Date;

  @Field()
  @Column()
  created_by: string;

  @Field()
  @Column()
  updated_by: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  deleted_by: string;

  @Field({ nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date;

  @Field()
  @Column('decimal')
  salary: number;

  // 🔹 Relación ManyToMany con Roles
  @Field(() => [Role])
  @ManyToMany(() => Role, (role) => role.users, { eager: true })
  @JoinTable({ name: 'user_roles' }) // nombre de la tabla pivote
  roles: Role[];
}
