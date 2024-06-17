import { Component, inject, signal } from '@angular/core';
import { TaskColumnsService } from '../../services/task-columns.service';
import { ProjectsService } from '../../services/projects.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Project } from '../../types/Project';
import { TaskColumn } from '../../types/TaskColumn';
import { TaskColumnComponent } from "../../components/task-column/task-column.component";
import { CdkDropListGroup } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [TaskColumnComponent, RouterModule, CdkDropListGroup]
})
export class DashboardComponent {
  columnsService = inject(TaskColumnsService);
  projectsService = inject(ProjectsService);
  aroute = inject(ActivatedRoute);

  projectId = this.aroute.snapshot.params['id'];
  boardId = this.aroute.snapshot.params['boardId'];

  project = signal<Project | null>(null);
  columns = signal<TaskColumn[]>([]);

  constructor() {
    this.projectsService.getProjectById(this.projectId).subscribe(res => {
      if (res) {
        this.project.set(res);
      }
    });

    this.columnsService.getColumnsByDashboardId(this.boardId).subscribe(res => {
      this.columns.set(res);
    });
  }
}
