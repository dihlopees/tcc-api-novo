import * as Joi from 'joi';

export type RoleType = 'operator' | 'admin' | 'manager';

export type OrderingTypes = 'ASC' | 'DESC';
export const orderByValues = ['ASC', 'DESC'];

export class Schema {
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

  static blockId = Joi.number().allow(null);

  static username = Joi.string();
  static role = Joi.string();
  static id = Joi.number().min(1);
  static availableQuantity = Joi.number().min(1);
  static permissions = Joi.array().unique().items(Joi.string());

  static ids = Joi.array().items(this.id).min(1);

  static isDisabled = Joi.boolean().optional();

  static itemsAllocatable = Joi.object({
    seatsQuantity: Joi.number().allow(null).optional(),
    multimediaQuantity: Joi.number().allow(null).optional(),
    outletsQuantity: Joi.number().allow(null).optional(),
    airConditionersQuantity: Joi.number().allow(null).optional(),
    allowsTransmission: Joi.boolean().allow(null).optional(),
  });
  static itensExtras = Joi.object({
    id: Joi.number().required(),
    quantity: Joi.number().required(),
  });

  static extras = Joi.array().items(this.itensExtras).optional();

  static startTime = Joi.string().required();
  static endTime = Joi.string().required();
  static startDate = Joi.string().required();
  static endDate = Joi.string().optional();
  static title = Joi.string().required();
  static note = Joi.string().allow(null).optional();
  static bookedForUserId = Joi.number().allow(null).optional();
  static reservationColor = Joi.string().required();

  static quantity = Joi.number().required();

  static type = Joi.string().required();
  static block = Joi.string().required();
}
