import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { UpdatePasswordUserDTO } from '../dtos/users/ChangePasswordDTO';
import { CreateUserDTO } from '../dtos/users/CreateUserDTO';
import { UpdateUserDTO } from '../dtos/users/UpdateUserDTO';
import { UserDTO } from '../dtos/users/UserDTO';
import { UserFilterDTO } from '../dtos/users/UserFilterDTO';
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
      role: user.role,
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
      role: user.role,
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

  async updateUserPassword(
    id: number,
    user: UpdatePasswordUserDTO,
  ): Promise<boolean> {
    const userToUpdate = await this.usersRepository.findOneBy({
      id,
    });
    if (!userToUpdate)
      throw HttpExceptionDTO.warn(
        `User not found`,
        'Usuário não encontrado',
        HttpStatus.BAD_REQUEST,
      );

    const passwordMatch = await bcrypt.compare(
      user.oldPassword,
      userToUpdate.password,
    );

    if (!passwordMatch) {
      throw HttpExceptionDTO.error(
        'Unauthorized',
        'Senha antiga incorreta',
        HttpStatus.FORBIDDEN,
      );
    }
    const encryptPassword = await bcrypt.hash(user.password, 10);
    const updateResult = await this.usersRepository.update(id, {
      password: encryptPassword,
      forcePassword: false,
    });
    return updateResult.affected === 1;
  }

  async updateForcePassword(id: number): Promise<boolean> {
    const userToUpdate = await this.usersRepository.findOneBy({
      id,
    });
    if (!userToUpdate)
      throw HttpExceptionDTO.warn(
        `User not found`,
        'Usuário não encontrado',
        HttpStatus.BAD_REQUEST,
      );

    const updateResult = await this.usersRepository.update(id, {
      forcePassword: false,
    });
    return updateResult.affected === 1;
  }

  async getMe(user: number): Promise<UserDTO> {
    const myUser = await this.usersRepository.findOne({
      where: {
        id: user,
      },
      relations: ['role'],
    });

    if (!myUser)
      throw HttpExceptionDTO.warn(
        `User not found`,
        'Usuário não encontrada',
        HttpStatus.BAD_REQUEST,
      );

    return new UserDTO(myUser, myUser.role.role);
  }

  async getAll(filters: UserFilterDTO) {
    const where: FindManyOptions<UserEntity>['where'] = {};

    if (filters) {
      if (filters.name) where.name = ILike(`%${filters.name}%`);
      if (filters.email) where.email = ILike(`%${filters.email}%`);
      if (filters.role) {
        const role = await this.roleRepository.findOne({
          where: { role: filters.role },
        });

        where.roleId = role?.id;
      }
    }
    const allUsers = await this.usersRepository.find({
      where,
      relations: ['role'],
      order: { createdAt: 'DESC' },
    });

    if (!allUsers.length) return [];

    return allUsers.map((it) => new UserDTO(it, it.role.role));
  }

  async deleteUsers(
    usersToDelete: number,
    loggedUser: UserDTO,
  ): Promise<number | null | undefined> {
    if (loggedUser.role !== 'admin')
      throw HttpExceptionDTO.warn(
        `User not have permission`,
        'Usuário não tem permissão para deletar usuários',
        HttpStatus.FORBIDDEN,
      );

    const deletedUsers = await this.usersRepository.delete(usersToDelete);
    return deletedUsers.affected;
  }
}
