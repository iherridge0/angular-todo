import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.constants';
import { User } from 'src/app/user/user.component';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(
    private http: HttpClient
  ) { }

  saveUser(user: User) {
    return this.http.post(`${API_URL}/jpa/users`, user);
  }
}
