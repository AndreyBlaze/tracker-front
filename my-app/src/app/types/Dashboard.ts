import { BaseType } from "./User";

export type Dashboard = BaseType & {
  projectId: string;
  name: string;
}