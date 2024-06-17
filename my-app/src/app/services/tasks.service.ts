import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ProjectTask } from '../types/ProjectTask';

@Injectable({
  providedIn: 'root'
})
export class TasksService extends BaseService {

  constructor() {
    super();
  }

  public updateTask(task: ProjectTask) {
    return this.http.put<ProjectTask>(`${this.baseUrl}/api/tasks`, task)
  }

  public addTask(task: ProjectTask) {
    return this.http.post<ProjectTask>(`${this.baseUrl}/api/tasks`, task) 
  }
}
