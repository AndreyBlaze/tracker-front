import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { TaskColumn } from '../types/TaskColumn';

@Injectable({
  providedIn: 'root'
})
export class TaskColumnsService extends BaseService {

  constructor() {
    super();
  }

  public getColumnsByDashboardId(boardId: string) {
    return this.http.get<TaskColumn[]>(`${this.baseUrl}/api/task-columns/${boardId}`);
  }
}
