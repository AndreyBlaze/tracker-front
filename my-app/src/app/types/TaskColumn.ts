import { ProjectTask } from "./ProjectTask";
import { BaseType } from "./User";

export type TaskColumn = BaseType & {
  name: string;
  dashboardId: string;
  tasks: ProjectTask[];
}