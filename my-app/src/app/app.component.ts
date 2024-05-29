import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { SidebarComponent } from "./components/sidebar/sidebar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, SidebarComponent]
})
export class AppComponent {
  title = 'ProManager';
  authService = inject(AuthService);

  get isAuthed() {
    return this.authService.isLoggedIn();
  }
}
