import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDTO } from '../dtos/users/CreateUserDTO';
import { UpdateUserDTO } from '../dtos/users/UpdateUserDTO';
import { UserDTO } from '../dtos/users/UserDTO';
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

  async createUser(user: CreateUserDTO): Promise<UserDTO> {
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

    const savedUser = await this.usersRepository.save(newUser);
    const myUser = new UserDTO(savedUser, roleToSave.role);
    return myUser;
  }

  async updateUser(id: number, user: UpdateUserDTO): Promise<boolean> {
    const roleToSave = await this.roleRepository.findOneBy({
      role: user.userRole,
    });

    if (!roleToSave?.role)
      throw HttpExceptionDTO.warn(
        `Role not found`,
        'Função não encontrada',
        HttpStatus.NOT_FOUND,
      );

    const updateResult = await this.usersRepository.update(id, {
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

  async getAll(users?: number[]) {
    const allUsers = await this.usersRepository.find({ relations: ['role'] });

    if (!allUsers.length)
      throw HttpExceptionDTO.warn(
        `Users not found`,
        'Usuários não encontrados',
        HttpStatus.NOT_FOUND,
      );

    return allUsers;
  }

  async deleteUsers(
    usersToDelete: number,
    loggedUser: number,
  ): Promise<number | null | undefined> {
    //descomentar quando receber token de user logged
    // const user = await this.usersRepository.findOne({
    //   where: {
    //     id: loggedUser,
    //   },
    //   relations: ['role'],
    // });

    // if (!user || user.role.role !== 'admin')
    //   throw HttpExceptionDTO.warn(
    //     `User not have permission`,
    //     'Usuário nãotem permissão para deletar usuários',
    //     HttpStatus.FORBIDDEN,
    //   );

    const deletedUsers = await this.usersRepository.delete(usersToDelete);
    return deletedUsers.affected;
  }
}
