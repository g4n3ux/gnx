import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateGlobalInput } from './dto/create-global.input';
import { UpdateGlobalInput } from './dto/update-global.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Global } from './entities/global.entity';


@Injectable()
export class GlobalsService {
  constructor(
    @InjectRepository(Global)
    private globalsRepository: Repository<Global>,
  ) {}

  create(createGlobalInput: CreateGlobalInput) {
    const global = this.globalsRepository.create(createGlobalInput);
    return this.globalsRepository.save(global);
  }

  findAll() {
    return `This action returns all globals`;
  }

  findOne(id: number) {
    return `This action returns a #${id} global`;
  }

  update(id: number, updateGlobalInput: UpdateGlobalInput) {
    return `This action updates a #${id} global`;
  }

  remove(id: number) {
    return `This action removes a #${id} global`;
  }
}
