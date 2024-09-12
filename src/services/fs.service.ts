import fs from "node:fs/promises";
import path from "node:path";

import { IUser } from "../interfaces/user.interface";

const readData = async (): Promise<IUser[]> => {
  const pathToUL = path.join(process.cwd(), "usersList.json");
  const data = await fs.readFile(pathToUL, "utf8");
  return JSON.parse(data);
};

const writeData = async (users: IUser[]): Promise<void> => {
  const pathToUL = path.join(process.cwd(), "usersList.json");
  await fs.writeFile(pathToUL, JSON.stringify(users));
};

export { readData, writeData };
