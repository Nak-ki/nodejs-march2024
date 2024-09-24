import { EmailTypeEnum } from "../enums/email-type.enum";
import { ApiError } from "../errors/api-error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import { ISignIn, ISignUp, IUser } from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async signUp(
    dto: ISignUp,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    await this.isEmailExistOrThrow(dto.email);
    const password = await passwordService.hashPassword(dto.password);
    const user = await userRepository.create({
      name: dto.name,
      email: dto.email,
      password,
      phone: dto.phone,
      age: dto.age,
    });

    const tokens = tokenService.generateTokens({
      userId: user._id,
      role: user.role,
      deviceId: dto.deviceId,
    });

    await tokenRepository.create({
      ...tokens,
      deviceId: dto.deviceId,
      _userId: user._id,
    });

    // await emailService.sendMail(EmailTypeEnum.WELCOME, user.email, {
    //   name: user.name,
    // });
    return { user, tokens };
  }

  public async signIn(
    dto: ISignIn,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    const user = await userRepository.getByEmail(dto.email);
    if (!user) {
      throw new ApiError("User not found", 404);
    }

    const isPasswordCorrect = await passwordService.comparePassword(
      dto.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new ApiError("Invalid credentials", 401);
    }

    const tokens = tokenService.generateTokens({
      userId: user._id,
      role: user.role,
      deviceId: dto.deviceId,
    });
    await tokenRepository.create({
      ...tokens,
      deviceId: dto.deviceId,
      _userId: user._id,
    });
    return { user, tokens };
  }

  public async refresh(
    payload: ITokenPayload,
    refreshToken: string,
  ): Promise<ITokenPair> {
    const tokens = tokenService.generateTokens({
      userId: payload.userId,
      role: payload.role,
      deviceId: payload.deviceId,
    });
    await tokenRepository.create({
      ...tokens,
      deviceId: payload.deviceId,
      _userId: payload.userId,
    });
    await tokenRepository.deleteByParams({ refreshToken });
    return tokens;
  }

  public async logout(payload: ITokenPayload): Promise<void> {
    const user = await userRepository.getById(payload.userId);
    await tokenRepository.deleteByParams({
      _userId: payload.userId,
      deviceId: payload.deviceId,
    });
    await emailService.sendMail(EmailTypeEnum.LOGOUT, user.email, {
      name: user.name,
    });
  }

  public async logoutCompletely(payload: ITokenPayload): Promise<void> {
    const user = await userRepository.getById(payload.userId);
    await tokenRepository.deleteManyByParams({
      _userId: payload.userId,
    });
    await emailService.sendMail(EmailTypeEnum.LOGOUT_COMPLETELY, user.email, {
      name: user.name,
    });
  }

  private async isEmailExistOrThrow(email: string): Promise<void> {
    const user = await userRepository.getByEmail(email);
    if (user) {
      throw new ApiError("Email already exists", 409);
    }
  }
}

export const authService = new AuthService();
