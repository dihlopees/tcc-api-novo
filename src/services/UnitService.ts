import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUnitDTO } from '../dtos/unit/CreateUnitDTO';
import { UpdateUserDTO } from '../dtos/users/UpdateUserDTO';
import { UnitEntity } from '../entities/UnitEntity';
import { UserEntity } from '../entities/UserEntity';
import { HttpExceptionDTO } from '../helpers/HttpExceptionDTO';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(UnitEntity)
    private readonly unitRepository: Repository<UnitEntity>,
  ) {}

  async create(unit: CreateUnitDTO): Promise<UnitEntity> {
    return await this.unitRepository.save(unit);
  }

  async update(user: UpdateUserDTO) {}

  async getOne(user: number): Promise<UserEntity> {
    const myUser = await this.unitRepository.findOneBy({
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
    const allUsers = await this.unitRepository.find();

    if (!allUsers.length)
      throw HttpExceptionDTO.warn(
        `Users not found`,
        'Usuários não encontrados',
        HttpStatus.NOT_FOUND,
      );

    return allUsers;
  }

  async delete(
    usersToDelete: number[],
    loggedUser: number,
  ): Promise<number | null | undefined> {
    const user = await this.unitRepository.findOneBy({
      id: loggedUser,
    });

    if (!user || user.role.role !== 'admin')
      throw HttpExceptionDTO.warn(
        `User not have permission`,
        'Usuário nãotem permissão para deletar usuários',
        HttpStatus.FORBIDDEN,
      );

    const deletedUsers = await this.unitRepository.delete(usersToDelete);
    return deletedUsers.affected;
  }
}
