import { AppFile } from "./AppFile";

export type BaseType = {
  id: string | null;
  dateAdd: string | null;
  dateUpdate: string | null;
}

export enum UserRole {
  User = 0,
  Admin = 1
}

export type User = BaseType & {
  userName: string;
  password: string;
  email: string;
  role: UserRole;
  avatarId?: string;
  avatar?: AppFile;
  name: string;
  surname: string;
}