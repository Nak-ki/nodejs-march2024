import { model, Schema } from "mongoose";

import { IToken } from "../interfaces/token.interface";
import { User } from "./user.model";

const TokenSchema = new Schema(
  {
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },

    _userId: { type: Schema.Types.ObjectId, required: true, ref: User },
    deviceId: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Token = model<IToken>("tokens", TokenSchema);
