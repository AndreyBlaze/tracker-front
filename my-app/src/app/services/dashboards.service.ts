import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Dashboard } from '../types/Dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardsService extends BaseService {

  constructor() {
    super();
  }

  public getDashboardsByProjectId(projectId: string) {
    return this.http.get<Dashboard[]>(`${this.baseUrl}/api/dashboards/${projectId}`);
  }
}
