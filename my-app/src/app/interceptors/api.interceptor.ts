import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const token = authService.getToken();

  const cloned = req.clone({
    headers: req.headers.set('Authorization', 'Bearer ' + token)
  });
  return next(cloned);
};
