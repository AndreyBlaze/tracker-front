import { Component, Input } from '@angular/core';
import { Project } from '../../types/Project';
import { DisplayNamePipe } from "../../pipes/display-name.pipe";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-project',
    standalone: true,
    templateUrl: './project.component.html',
    styleUrl: './project.component.scss',
    imports: [DisplayNamePipe, RouterModule]
})
export class ProjectComponent {
  @Input() project!: Project;
}
