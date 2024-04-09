import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDTO } from '../dtos/users/CreateUserDTO';
import { UpdateUserDTO } from '../dtos/users/UpdateUserDTO';
import { RoleEntity } from '../entities/RoleEntity';
import { UserEntity } from '../entities/UserEntity';
import { HttpExceptionDTO } from '../helpers/HttpExceptionDTO';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async createUser(user: CreateUserDTO): Promise<UserEntity> {
    const roleToSave = await this.roleRepository.findOneBy({
      role: user.userRole,
    });

    if (!roleToSave?.role)
      throw HttpExceptionDTO.warn(
        `Role not found`,
        'Função não encontrada',
        HttpStatus.NOT_FOUND,
      );

    const encryptPassword = await bcrypt.hash(user.password, 10);
    const newUser = {
      name: user.name,
      email: user.email,
      roleId: roleToSave.id,
      password: encryptPassword,
    };

    return await this.usersRepository.save(newUser);
  }

  async updateUser(user: UpdateUserDTO): Promise<boolean> {
    const roleToSave = await this.roleRepository.findOneBy({
      role: user.userRole,
    });

    if (!roleToSave?.role)
      throw HttpExceptionDTO.warn(
        `Role not found`,
        'Função não encontrada',
        HttpStatus.NOT_FOUND,
      );

    const updateResult = await this.usersRepository.update(user.id, {
      name: user.name,
      email: user.email,
      roleId: roleToSave.id,
    });
    return updateResult.affected === 1;
  }

  async getMe(user: number): Promise<UserEntity> {
    const myUser = await this.usersRepository.findOneBy({
      id: user,
    });

    if (!myUser)
      throw HttpExceptionDTO.warn(
        `User not found`,
        'Usuário não encontrada',
        HttpStatus.NOT_FOUND,
      );

    return myUser;
  }

  async getAll(users: number[]) {}

  async deleteUsers(usersToDelete: number[], loggedUser: number) {
    const user = await this.usersRepository.findOneBy({
      id: loggedUser,
    });

    if (!user || user.role.role !== 'admin')
      throw HttpExceptionDTO.warn(
        `User not found`,
        'Usuário não encontrada',
        HttpStatus.NOT_FOUND,
      );
  }
}
