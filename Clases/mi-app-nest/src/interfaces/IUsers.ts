import { Roles } from "src/entities/user.entity";

export type IUser = {
  id: number;
  name: string;
  email: string;
  age?: number;
  password: string;
  role: Roles;
};
