import * as Joi from 'joi';

export class AuthenticationSchema {
  static password = Joi.string()
    .pattern(
      /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z\d`~!@#$%^&*_|+\-=?;:'",.\\]{8,40}$/,
    )
    .message('A valid password must be provided!')
    .messages({
      'string.empty': 'Senha não pode ser vázia',
      'string.min': 'Senha deve conter pelo menos 6 caracteres',
      'string.max': 'Senha não pode conter mais que 30 caracteres',
      'any.required': 'Uma senha deve ser fornecida',
      'string.pattern.base':
        'Senha deve conter uma letra maiúscula, uma letra minúscula e um número',
    });
  static email = Joi.string()
    .pattern(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    )
    .message('A valid email address must be provided!')
    .lowercase()
    .messages({
      'string.empty': 'E-mail não pode ser vázio',
      'string.min': 'E-mail deve conter pelo menos 6 caracteres',
      'any.required': 'Um e-mail deve ser fornecida',
      'string.pattern.base': 'E-mail deve ser válido',
    });
  static username = Joi.string().min(3).max(45).messages({
    'string.empty': 'Nome de usuário não pode ser vazio',
    'any.required': 'Nome de usuário é requerido',
  });
}
