import { ApiError } from "../errors/api-error";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }

  public async create(dto: Partial<IUser>): Promise<IUser> {
    if (!dto.name || dto.name.length < 3) {
      throw new ApiError(
        "Name is required and should be at least 3 characters long",
        400,
      );
    }
    if (!dto.email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(dto.email)) {
      throw new ApiError("Email is required and should be valid", 400);
    }
    if (
      !dto.password ||
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(dto.password)
    ) {
      throw new ApiError(
        "Password is required and should be at least 6 characters long",
        400,
      );
    }
    return await userRepository.create(dto);
  }

  public async getById(userId: number): Promise<IUser> {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }

  public async updateById(userId: number, dto: Partial<IUser>): Promise<IUser> {
    await this.getById(userId);
    const user = await userRepository.updateById(userId, dto);
    return user;
  }

  public async deleteById(userId: number): Promise<void> {
    await this.getById(userId);
    await userRepository.deleteById(userId);
  }
}

export const userService = new UserService();
