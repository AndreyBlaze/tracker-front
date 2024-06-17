import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardsComponent } from './pages/dashboards/dashboards.component';
import { TasksListComponent } from './pages/tasks-list/tasks-list.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'projects/:id/dashboards', component: DashboardsComponent},
  {path: 'projects/:id/tasks-list', component: TasksListComponent},
  {path: 'projects/:id/dashboards/:boardId', component: DashboardComponent},
  {path: 'projects/:id/chats/:chatId', loadChildren: () => import('./pages/chat/chat.module').then(x => x.ChatModule)},
  {path: 'chats/:id', loadChildren: () => import('./pages/chat/chat.module').then(x => x.ChatModule)},
  {path: '**', redirectTo: 'login'}
];
