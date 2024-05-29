import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AuthDataDTO } from '../types/AuthDataDTO';
import { AuthData } from '../types/AuthData';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor() {
    super();
  }

  public login(data: AuthDataDTO) {
    return this.http.post<AuthData>(`${this.baseUrl}/api/auth/login`, data);
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('role');
    }
  }

  setAuthData(data: AuthData) {
    if (this.isBrowser) {
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('role', data.role);
    }
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  isLoggedIn() {
    return this.isBrowser ? !!localStorage.getItem('token') : false;
  }
}
