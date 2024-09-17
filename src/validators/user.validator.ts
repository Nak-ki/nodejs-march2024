import Joi from "joi";

import { IUser } from "../interfaces/user.interface";

export class UserValidator {
  public static createUser: Joi.ObjectSchema<Partial<IUser>> = Joi.object({
    name: Joi.string().min(3).max(15).required(),
    email: Joi.string()
      .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      .lowercase()
      .required(),
    phone: Joi.string(),
    password: Joi.string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .required(),
    age: Joi.number().min(14).max(100),
  });

  public static updateUser: Joi.ObjectSchema<Partial<IUser>> = Joi.object({
    name: Joi.string().min(3).max(15),
    phone: Joi.string(),
    age: Joi.number().min(14).max(100),
  });
}
