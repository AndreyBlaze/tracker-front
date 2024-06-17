import { Component, inject, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { AsyncPipe } from '@angular/common';
import { User } from '../../types/User';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [AsyncPipe, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  usersService = inject(UsersService);

  user = signal<User | null>(null);

  expandedDropdown = signal<{[block: string]: boolean}>({
    'tasks-view': false
  });

  constructor() {
    this.usersService.getSelf().subscribe(res => {
      this.user.set(res);
    })
  }

  expand(key: string) {
    this.expandedDropdown.update(values => {
      return {...values, [key]: !this.expandedDropdown()[key]}
    })
  }
}
