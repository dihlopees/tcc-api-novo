import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlockDTO } from '../dtos/block/CreateBlockDTO';
import { EditBlockDTO } from '../dtos/block/EditBlockDTO';
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

  async getAll(entities?: number[]) {
    const allEntities = await this.blockRepository.find();

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
    loggedUser: number,
  ): Promise<number | null | undefined> {
    const deletedEntities = await this.blockRepository.delete(entityToDelete);
    return deletedEntities.affected;
  }
}
