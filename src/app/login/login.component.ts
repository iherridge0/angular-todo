import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'in28minutes';
  password = '';
  errorMessage = 'Invalid Login';
  invalidLogin = false;

  constructor() { }

  ngOnInit(): void {
  }

  handleLogin() {
    if (this.username === '')
      this.invalidLogin = true;
    else
      this.invalidLogin = false;
  }
}
