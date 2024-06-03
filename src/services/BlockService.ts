import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateBlockDTO } from '../dtos/block/CreateBlockDTO';
import { EditBlockDTO } from '../dtos/block/EditBlockDTO';
import { UserDTO } from '../dtos/users/UserDTO';
import { Block } from '../entities/BlockEntity';
import { HttpExceptionDTO } from '../helpers/HttpExceptionDTO';

@Injectable()
export class BlockService {
  constructor(
    @InjectRepository(Block)
    private readonly blockRepository: Repository<Block>,
  ) {}

  async create(unit: CreateBlockDTO): Promise<Block> {
    return await this.blockRepository.save(unit);
  }

  async update(id: number, unit: EditBlockDTO) {
    return await this.blockRepository.update(id, {
      name: unit.name,
      unitId: unit.unitId,
    });
  }

  async getOne(user: number) {
    const entityFound = await this.blockRepository.findOneBy({
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

  async getAll(filter: { unitId: number }) {
    const where: FindManyOptions<Block>['where'] = {};

    if (filter.unitId) where.unitId = filter.unitId;

    const allEntities = await this.blockRepository.find({ where });

    if (!allEntities.length) return [];

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
    const deletedEntities = await this.blockRepository.delete(entityToDelete);
    return deletedEntities.affected;
  }
}
