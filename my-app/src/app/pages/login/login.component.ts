import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AuthDataDTO } from '../../types/AuthDataDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService)
  router = inject(Router);

  form = this.fb.group({
    login: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
    password: ['', Validators.compose([Validators.required, Validators.min(3)])]
  });

  loading = signal(false);
  loginError = signal(false);

  get disabled() {
    let hasErrors = Object.keys(this.form.controls).some(x => this.form.get(x)?.errors !== null);
    return hasErrors || this.loading() || this.loginError();
  }

  login() {
    this.loading.set(true);
    this.authService.login(this.form.value as AuthDataDTO).subscribe({
      next: res => {
        this.authService.setAuthData(res);
        this.loading.set(false);
        this.router.navigate(['/projects'])
      }, 
      error: err => {
        this.loginError.set(true);
        this.loading.set(false);
      }
    })
  }
}
