import { Component, computed, inject, signal } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../types/Project';
import { ProjectFilter } from '../../types/ProjectFIlter';
import { FilterType } from '../../types/FilterType';
import { Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectComponent } from "../../components/project/project.component";

@Component({
    selector: 'app-projects',
    standalone: true,
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.scss',
    imports: [FormsModule, ReactiveFormsModule, ProjectComponent]
})
export class ProjectsComponent {
  projectsService = inject(ProjectsService);

  projects = signal<Project[]>([]);
  projectsCount = computed(() => this.projects().length);

  projectSubscription = new Subscription();

  search = '';
  searchDebouncer = new Subject<string>();

  filter = signal<ProjectFilter>({
    name: FilterType.Asc,
    date: FilterType.Asc,
    search: ''
  });

  constructor() {
    this.searchDebouncer.pipe(distinctUntilChanged(), debounceTime(600)).subscribe(value => {
      this.filter.update(values => ({...values, search: value}));
      this.getProjects();
    });

    this.getProjects();
  }

  getProjects() {
    this.projectSubscription.unsubscribe();
    this.projectSubscription = this.projectsService.getProjects(this.filter()).subscribe(res => {
      this.projects.set(res);
    })
  }

  changeFilter(filter: keyof ProjectFilter) {
    this.filter.update(values => {
      return {...values, [filter]: this.filter()[filter] === FilterType.Asc ? FilterType.Desc : FilterType.Asc}
    });

    this.getProjects();
  }
}
