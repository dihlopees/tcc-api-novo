import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUnitDTO } from '../dtos/unit/CreateUnitDTO';
import { EditUnitDTO } from '../dtos/unit/EditUnitDTO';
import { UserDTO } from '../dtos/users/UserDTO';
import { UnitEntity } from '../entities/UnitEntity';
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

  async update(id: number, unit: EditUnitDTO) {
    return await this.unitRepository.update(id, { name: unit.name });
  }

  async getOne(user: number) {
    const entityFound = await this.unitRepository.findOneBy({
      id: user,
    });

    if (!entityFound)
      throw HttpExceptionDTO.warn(
        `Not found`,
        'Não encontrada',
        HttpStatus.NOT_FOUND,
      );

    return entityFound;
  }

  async getAll() {
    const allEntities = await this.unitRepository.find();

    if (!allEntities.length)
      throw HttpExceptionDTO.warn(
        `Not found`,
        'Não encontrados',
        HttpStatus.NOT_FOUND,
      );

    return allEntities;
  }

  async delete(
    entityToDelete: number,
    user: UserDTO,
  ): Promise<number | null | undefined> {
    if (user.role !== 'admin')
      throw HttpExceptionDTO.warn(
        `User not have permission`,
        'Usuário não tem permissão para deletar recursos',
        HttpStatus.FORBIDDEN,
      );

    const deletedEntities = await this.unitRepository.delete(entityToDelete);
    return deletedEntities.affected;
  }
}
