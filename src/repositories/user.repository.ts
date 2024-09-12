import { IUser } from "../interfaces/user.interface";
import { readData, writeData } from "../services/fs.service";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await readData();
  }

  public async create(dto: Partial<IUser>): Promise<IUser> {
    const users = await readData();

    const newUser = {
      id: users.length ? users[users.length - 1]?.id + 1 : 1,
      name: dto.name,
      email: dto.email,
      password: dto.password,
    };
    users.push(newUser);
    await writeData(users);

    return newUser;
  }

  public async getById(userId: number): Promise<IUser | null> {
    const users = await readData();
    return users.find((user) => user.id === userId);
  }

  public async updateById(userId: number, dto: Partial<IUser>): Promise<IUser> {
    const users = await readData();
    const userIndex = users.findIndex((user) => user.id === userId);
    const { name, email, password } = dto;
    if (name.length <= 20 && name.length >= 2) {
      users[userIndex].name = name;
    }
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      users[userIndex].email = email;
    }

    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)) {
      users[userIndex].password = password;
    }

    await writeData(users);
    return users[userIndex];
  }

  public async deleteById(userId: number): Promise<void> {
    const users = await readData();
    const userIndex = users.findIndex((user) => user.id === userId);
    users.splice(userIndex, 1);
    await writeData(users);
  }
}

export const userRepository = new UserRepository();
