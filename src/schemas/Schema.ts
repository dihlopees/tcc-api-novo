import * as Joi from 'joi';

export type RoleType = 'operator' | 'admin' | 'manager';

export type OrderingTypes = 'ASC' | 'DESC';
export const orderByValues = ['ASC', 'DESC'];

export class Schema {
  static page = Joi.number().min(0).default(0);
  static pageSize = Joi.number().min(1).max(100).default(20);

  static email = Joi.string()
    .pattern(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    )
    .message('A valid email address must be provided!');
  static password = Joi.string()
    .pattern(
      /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z\d`~!@#$%^&*_|+\-=?;:'",.\\]{8,40}$/,
    )
    .message('A valid password must be provided!');

  static username = Joi.string();
  static role = Joi.string();
  static id = Joi.number().min(1);
  static availableQuantity = Joi.number().min(1);
  static permissions = Joi.array().unique().items(Joi.string());

  static ids = Joi.array().items(this.id).min(1);

  static isDisabled = Joi.boolean().optional();

  static filterParams = Joi.object({
    ids: Joi.array().items(this.id).min(1).unique().optional(),
    roles: Joi.array().items(Joi.string()).min(1).unique().optional(),
    companyIds: Joi.array().items(this.id).min(1).unique().optional(),
  });

  static orderParams = Joi.object({
    ids: Joi.string()
      .valid(...orderByValues)
      .optional(),
    roles: Joi.string()
      .valid(...orderByValues)
      .optional(),
    companyIds: Joi.string()
      .valid(...orderByValues)
      .optional(),
    names: Joi.string()
      .valid(...orderByValues)
      .optional(),
  })
    .min(1)
    .max(1);

  static searchParams = Joi.object({
    id: Joi.number().min(1).optional(),
    companyId: Joi.number().min(1).optional(),
    name: Joi.string().min(1).optional(),
    email: Joi.string().min(1).optional(),
    companyName: Joi.string().min(1).optional(),
  }).min(1);

  static itemsAllocatable = Joi.object({
    seatsQuantity: Joi.number().allow(null).optional(),
    multimediaQuantity: Joi.number().allow(null).optional(),
    outletsQuantity: Joi.number().allow(null).optional(),
    airConditionersQuantity: Joi.number().allow(null).optional(),
    allowsTransmission: Joi.boolean().allow(null).optional(),
  });

  static startTime = Joi.string().required();
  static endTime = Joi.string().required();
  static note = Joi.string().allow(null).optional();
  static bookedForUserId = Joi.number().allow(null).optional();
  static reservationColor = Joi.string().required();
}
