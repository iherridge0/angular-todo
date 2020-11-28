import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor() { }

  authenticate(username: string, password: string) {
    if (username === 'in28minutes' && password === 'dummy') {
      sessionStorage.setItem('authenticated', username);
      return false;
    }
    return true;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('authenticated');
    return !(user === null);
  }

  logout() {
    sessionStorage.removeItem('authenticated');
  }

  getAuthenticatedUser(): string {
    let user = sessionStorage.getItem('authenticated');
    if (user === null)
      return ''
    else
      return user;
  }
}
