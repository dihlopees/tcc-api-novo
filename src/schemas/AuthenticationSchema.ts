// import * as Joi from 'joi'
// import { emailRegex, passwordRegex } from '../helpers/Regexes'

// export class AuthenticationSchema {
//   static password = Joi.string().min(6).max(30).regex(passwordRegex).messages({
//     'string.empty': 'Senha não pode ser vázia',
//     'string.min': 'Senha deve conter pelo menos 6 caracteres',
//     'string.max': 'Senha não pode conter mais que 30 caracteres',
//     'any.required': 'Uma senha deve ser fornecida',
//     'string.pattern.base': 'Senha deve conter uma letra maiúscula, uma letra minúscula e um número',
//   })
//   static email = Joi.string().min(6).regex(emailRegex).lowercase().messages({
//     'string.empty': 'E-mail não pode ser vázio',
//     'string.min': 'E-mail deve conter pelo menos 6 caracteres',
//     'any.required': 'Um e-mail deve ser fornecida',
//     'string.pattern.base': 'E-mail deve ser válido',
//   })
//   static username = Joi.string().min(3).max(45).messages({ 'string.empty': 'Nome de usuário não pode ser vazio', 'any.required': 'Nome de usuário é requerido' })

// }
