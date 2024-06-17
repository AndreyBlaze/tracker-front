import { BaseType } from "./User";

export type AppFile = BaseType & {
  userId: string;
  fileName: string;
  fullUrl: string;
}