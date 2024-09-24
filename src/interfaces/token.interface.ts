import { RoleEnum } from "../enums/role.enum";

export interface IToken {
  _id?: string;
  accessToken: string;
  refreshToken: string;
  _userId: string;
  deviceId: string;
}

export interface ITokenPayload {
  userId: string;
  role: RoleEnum;
  deviceId: string;
}

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}
