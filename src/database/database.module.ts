// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule, // lee .env
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const dbType = config.get<'mysql' | 'mssql'>('DB_TYPE') || 'mysql';

        if (dbType === 'mysql') {
          return {
            type: 'mysql',
            host: config.get('DATABASE_HOST'),
            port: parseInt(config.get('DATABASE_PORT') || '3306', 10),
            username: config.get('DATABASE_USER'),
            password: config.get('DATABASE_PASSWORD'),
            database: config.get('DATABASE_NAME'),
            autoLoadEntities: true,
            synchronize: true, // solo dev
          };
        }

        if (dbType === 'mssql') {
          return {
            type: 'mssql',
            host: config.get('MSSQL_DATABASE_HOST'),
            port: parseInt(config.get('MSSQL_DATABASE_PORT') || '1433', 10),
            username: config.get('MSSQL_DATABASE_USER'),
            password: config.get('MSSQL_DATABASE_PASSWORD'),
            database: config.get('MSSQL_DATABASE_NAME'),
            autoLoadEntities: true,
            synchronize: true, // solo dev
            options: {
              encrypt: false,
              trustServerCertificate: true,
            },
          };
        }

        throw new Error(`Tipo de DB no soportado: ${dbType}`);
      },
    }),
  ],
})
export class DatabaseModule {}
