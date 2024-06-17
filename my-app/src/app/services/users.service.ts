import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { User } from '../types/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService {

  constructor() {
    super();
  }

  public getSelf() {
    return this.http.get<User>(`${this.baseUrl}/api/users/self`);
  }
}
