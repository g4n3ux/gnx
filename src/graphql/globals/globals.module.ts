import { Module } from '@nestjs/common';
import { GlobalsService } from './globals.service';
import { GlobalsResolver } from './globals.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Global } from './entities/global.entity';

@Module({  
  imports: [TypeOrmModule.forFeature([Global])],
  providers: [GlobalsResolver, GlobalsService],
})
export class GlobalsModule {}
