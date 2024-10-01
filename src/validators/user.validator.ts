import Joi from "joi";

import { IUser } from "../interfaces/user.interface";

export class UserValidator {
  public static createUser: Joi.ObjectSchema<Partial<IUser>> = Joi.object({
    name: Joi.string().min(3).max(15).trim().required(),
    email: Joi.string()
      .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      .lowercase()
      .trim()
      .required(),
    phone: Joi.string().trim(),
    password: Joi.string()
      .trim()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .trim()
      .required(),
    age: Joi.number().min(14).max(100),
  });

  public static updateUser: Joi.ObjectSchema<Partial<IUser>> = Joi.object({
    name: Joi.string().min(3).max(15),
    phone: Joi.string(),
    age: Joi.number().min(14).max(100),
  });

  public static logIn: Joi.ObjectSchema<Partial<IUser>> = Joi.object({
    email: Joi.string()
      .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      .lowercase()
      .trim()
      .required(),
    password: Joi.string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .trim()
      .required(),
  });

  public static changePassword = Joi.object({
    oldPassword: Joi.string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .trim()
      .required(),
    password: Joi.string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .trim()
      .required(),
  });
}
