import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleInput: CreateRoleInput): Promise<Role> {
    const role = this.roleRepository.create(createRoleInput);
    return this.roleRepository.save(role);
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.roleRepository.findOneBy({ id });
    if (!role) {
      // lanza excepción o devuelve null según prefieras
      throw new NotFoundException(`Role with id ${id} not found`);
    }
    return role;
  }

  async update(id: number, updateRoleInput: UpdateRoleInput): Promise<Role> {
    await this.roleRepository.update(id, updateRoleInput);
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const res = await this.roleRepository.delete(id);
    return (res.affected ?? 0) > 0; // 👈 chequeo null/undefined
  }
}
