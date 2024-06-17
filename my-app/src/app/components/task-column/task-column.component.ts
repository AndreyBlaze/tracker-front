import { Component, Input, inject, signal } from '@angular/core';
import { TaskColumn } from '../../types/TaskColumn';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { ProjectTask } from '../../types/ProjectTask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TasksService } from '../../services/tasks.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-column',
  standalone: true,
  imports: [CdkDropList, CdkDrag, FormsModule, ReactiveFormsModule, DatePipe],
  templateUrl: './task-column.component.html',
  styleUrl: './task-column.component.scss'
})
export class TaskColumnComponent {
  tasksService = inject(TasksService);

  @Input() column!: TaskColumn;
  @Input() projectId!: string;

  editTask = signal<string | null>(null);

  updateTaskSubscription = new Subscription();

  changeColumn(event: CdkDragDrop<ProjectTask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const task = event.previousContainer.data[event.previousIndex];

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      task.columnId = event.container.id;
      this.updateTaskSubscription.unsubscribe();
      this.updateTaskSubscription = this.tasksService.updateTask(task).subscribe(res => {
        this.editTask.set(null);
      });
    }
  }

  updateTask(event: Event, task: ProjectTask) {
    event.preventDefault();
    this.updateTaskSubscription.unsubscribe();
    if (task.id === 'new_task') {
      task.id = null;
      this.updateTaskSubscription = this.tasksService.addTask(task).subscribe(res => {
        this.editTask.set(null)
      })
    }
    else {
      this.updateTaskSubscription = this.tasksService.updateTask(task).subscribe(res => {
        this.editTask.set(null);
      });
    }
  }

  addTask() {
    let newTask: Partial<ProjectTask> = {
      id: "new_task",
      text: "",
      dateAdd: new Date().toISOString(),
      columnId: this.column.id!,
      projectId: this.projectId
    };

    this.column.tasks.push(newTask as ProjectTask);
    this.editTask.set("new_task");
  }
}
