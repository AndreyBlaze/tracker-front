import { Component, computed, inject, signal } from '@angular/core';
import { DashboardsService } from '../../services/dashboards.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Dashboard } from '../../types/Dashboard';

@Component({
  selector: 'app-dashboards',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboards.component.html',
  styleUrl: './dashboards.component.scss'
})
export class DashboardsComponent {
  boardsService = inject(DashboardsService);
  aroute = inject(ActivatedRoute);

  projectId = this.aroute.snapshot.params['id'];

  dashboards = signal<Dashboard[]>([]);
  boardsCount = computed(() => this.dashboards().length);

  constructor() {
    this.boardsService.getDashboardsByProjectId(this.projectId).subscribe(res => {
      this.dashboards.set(res);
    })
  }
}
