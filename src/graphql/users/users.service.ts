import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import * as bcrypt from 'bcrypt';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Crear usuario con password hasheado
  async create(createUserInput: CreateUserInput): Promise<User> {
    const user = this.usersRepository.create(createUserInput);

    // 🔹 hashear la contraseña
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);

    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  
async findOne(id: number): Promise<User> {
  const user = await this.usersRepository.findOneBy({ id });
  if (!user) throw new NotFoundException('User not found');
  return user;
}

  // Actualizar usuario, hasheando password si viene en el input
  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    if (updateUserInput.password) {
      const salt = await bcrypt.genSalt();
      updateUserInput.password = await bcrypt.hash(updateUserInput.password, salt);
    }
    await this.usersRepository.update(id, updateUserInput);
    return this.findOne(id);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    await this.usersRepository.delete(id);
    return user;
  }

  // 🔹 Buscar por username (para login)
  findByUsername(user_name: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { user_name } });
  }
}
