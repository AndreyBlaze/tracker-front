import { BaseType } from "./User";

export type ProjectTask = BaseType & {
  number: number;
  text: string;
  userId: string;
  projectId: string;
  columnId: string;
  deadLine: string | null;
}