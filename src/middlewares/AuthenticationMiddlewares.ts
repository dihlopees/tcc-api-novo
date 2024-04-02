
// import { HttpException, Injectable, InternalServerErrorException, NestMiddleware, NotFoundException, UnauthorizedException, UseFilters } from '@nestjs/common'
// import { InjectRepository } from '@nestjs/typeorm'
// import { ExceptionDTO } from '@viptech/brain-architecture/dtos/ExceptionDTO'
// import { ValidationTokenDTO } from '@viptech/brain-architecture/dtos/ValidationTokenDTO'
// import { CustomExceptionFilter } from '@viptech/brain-architecture/filters/CustomExceptionFilter'
// import { NextFunction } from 'express'
// import { ClsService } from 'nestjs-cls'
// import { JwtRequestDTO } from 'src/dtos/JwtRequestDTO'
// import { UserDTO } from 'src/dtos/validation/User/UserDTO'
// import { UserEntity } from 'src/entities/UserEntity'
// import { Repository } from 'typeorm'

// export declare type UserRequestDTO = JwtRequestDTO & {
//   userEntity: UserEntity
// }

// @Injectable()
// @UseFilters(new CustomExceptionFilter())
// export class AuthenticationMiddleware implements NestMiddleware {
//   constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>, private readonly cls: ClsService) {}
//   async use(req: UserRequestDTO, res: Response, next: NextFunction) {
//     try {
//       if (!req.processedPayloadDTO) throw new UnauthorizedException(ExceptionDTO.warn('Unauthorized', 'No authentication payload given'))
//       if (!req.processedPayloadDTO.id) throw new UnauthorizedException(ExceptionDTO.warn('Unauthorized', 'No bearer token given'))

//       const user = await this.userRepository.findOne({ where: { id: Number(req.processedPayloadDTO.id) }, relations: ['roleEntity'] })
//       if (!user) throw new NotFoundException(ExceptionDTO.warn('User was not found', `User with id ${req.processedPayloadDTO.id} was not found`))
//       if (!user.validationToken) throw new UnauthorizedException(ValidationTokenDTO.noTokenGiven('Validation Token'))

//       ValidationTokenDTO.validateToken(new UserDTO(user), req.processedPayloadDTO)
//       this.cls.set('user', user)
//       req.userEntity = user
//     } catch (error) {
//       if (error instanceof HttpException) throw error
//       else throw new InternalServerErrorException(ExceptionDTO.error('Unexpected error', error.message, 'Erro inesperado'))
//     }
//     next()
//   }
// }
