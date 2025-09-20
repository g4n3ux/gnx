// src/graphql/roles/roles.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';
import { Role } from './entities/role.entity';

@Module({
  imports: [
    // registramos la entidad Role para que TypeORM la cargue
    TypeOrmModule.forFeature([Role]),
  ],
  providers: [RolesResolver, RolesService],
  exports: [
    // exportamos para que otros módulos (ej. UsersModule) puedan usarla si es necesario
    TypeOrmModule,
    RolesService,
  ],
})
export class RolesModule {}
