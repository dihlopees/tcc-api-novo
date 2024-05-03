import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { UserDTO } from '../dtos/users/UserDTO';
import { UserEntity } from '../entities/UserEntity';

export declare interface UserRequestDTO extends Request {
  payload: UserDTO;
  iat: number;
  exp: number;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async use(req: any, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {
      const bearerToken = token?.split('Bearer ')[1];
      const decoded = jwt.verify(
        bearerToken,
        'ASDHASDÇLÇLPOPOEWQ',
      ) as UserRequestDTO;

      const userEntity = await this.userRepository.findOne({
        where: { id: decoded.payload.id },
      });

      if (!userEntity)
        return res.status(401).json({ message: 'Usuário não encontrado' });
      req.user = decoded.payload;

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido' });
    }
  }
}
