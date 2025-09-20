import { ApolloServer } from '@apollo/server';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ImportsModule } from './graphql/imports';

@Module({
  imports: [
    // configuración de graphql ysandbox
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql', // genera el esquema automáticamente
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()], // habilita playground
    }),

  

    // Configuración global de variables de entorno
    ConfigModule.forRoot({
      isGlobal: true, // permite usar ConfigService en cualquier módulo
    }),

    // Conexión a MariaDB
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mariadb',
        host: config.get<string>('DATABASE_HOST'),
        port: config.get<number>('DATABASE_PORT'),
        username: config.get<string>('DATABASE_USER'),
        password: config.get<string>('DATABASE_PASSWORD'),
        database: config.get<string>('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: true, // ⚠️ en producción mejor usar migraciones
      }),
    }),

    // Módulos de la aplicación
     ImportsModule,
  ],
})
export class AppModule {}
