import * as Joi from 'joi';

export const UserManyToManyRelationsValues = [
  'permissions',
  'authorizedClients',
  'authorizedCompanies',
] as const;
export const UserRelationsValues = [
  ...UserManyToManyRelationsValues,
  'company',
  'roleEntity',
] as const;
export type UserRelationsType = (typeof UserRelationsValues)[number];

export type RoleType = 'operator' | 'admin' | 'manager';

export type OrderingTypes = 'ASC' | 'DESC';
export const orderByValues = ['ASC', 'DESC'];

export type FilterType = {
  ids?: Array<number>;
  companyIds?: Array<number>;
};

export type OrderByType = {
  ids?: OrderingTypes;
  roles?: OrderingTypes;
  companyIds?: OrderingTypes;
  names?: OrderingTypes;
};
export type SearchType = {
  name?: string;
  email?: string;
  companyName?: string;
};
export class Schema {
  static page = Joi.number().min(0).default(0);
  static pageSize = Joi.number().min(1).max(100).default(20);

  static keepLoggedIn = Joi.boolean();
  static companyId = Joi.number().min(1);

  static otpToken = Joi.string().min(1);

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
  static authorizedCompanies = Joi.array().unique().items(Joi.number());
  static authorizedClients = Joi.array()
    .unique()
    .items(Joi.number().optional());

  static ids = Joi.array().items(this.id).min(1);

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
    seatsQuantity: Joi.number().optional(),
    multimediaQuantity: Joi.number().optional(),
    outletsQuantity: Joi.number().optional(),
    airConditionersQuantity: Joi.number().optional(),
    allowsTransmission: Joi.boolean().optional(),
  });
  //   static search = Joi.custom((value) => {
  //     const { object, result } = JoiCustomValidation.objectValidation(value, this.searchParams)
  //     if (result?.error) throw Error(result.error.details[0].message)
  //     return object
  //   })

  //   static orderBy = Joi.custom((value) => {
  //     const { object, result } = JoiCustomValidation.objectValidation(value, this.orderParams)
  //     if (result?.error) throw Error(result.error.details[0].message)
  //     return object
  //   })

  //   static filter = Joi.custom((value) => {
  //     const { object, result } = JoiCustomValidation.objectValidation(value, this.filterParams)
  //     if (result?.error) throw Error(result.error.details[0].message)
  //     return object
  //   })

  //   static includes = Joi.custom((value) => {
  //     const { includes, result } = JoiCustomValidation.includesValidation(value, [...UserRelationsValues])
  //     if (result?.error) throw Error(result.error.details[0].message)
  //     return includes
  //   })
}
