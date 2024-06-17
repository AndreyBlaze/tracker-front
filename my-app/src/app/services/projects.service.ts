import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ProjectFilter } from '../types/ProjectFIlter';
import { Project } from '../types/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService extends BaseService {

  constructor() {
    super();
  }

  public getProjects(filter: ProjectFilter) {
    return this.http.get<Project[]>(`${this.baseUrl}/api/projects?date=${filter.date}&name=${filter.name}&search=${filter.search ?? ''}`);
  }

  public getProjectById(id: string) {
    return this.http.get<Project | null>(`${this.baseUrl}/api/projects/${id}`);
  }
}
