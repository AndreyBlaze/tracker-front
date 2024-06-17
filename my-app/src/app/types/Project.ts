import { AppFile } from "./AppFile";
import { ProjectType } from "./ProjectType";
import { BaseType, User } from "./User";

export type Project = BaseType & {
  name: string;
  fileId?: string;
  appFile?: AppFile;
  creatorId: string;
  creator: User;
  type: ProjectType;
}

export enum ProjectRoleType {
  Owner = 0,
  Maintainer = 1,
  Guest = 2
}

export type ProjectMember = BaseType & {
  userId: string;
  projectId: string;
  role: ProjectRoleType;
}