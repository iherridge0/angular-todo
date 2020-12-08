import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import * as bcrypt from 'bcryptjs';
//import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  errorMessage = 'Invalid Login';
  invalidLogin = false;

  constructor(
    private router: Router,
    //private hardcodedAuthenticationService: HardcodedAuthenticationService,
    private basicAuthenticationService: BasicAuthenticationService
  ) { }

  ngOnInit(): void {
  }

  register() {
    this.router.navigate(['user/']);
  }

  // handleLogin() {
  //   if (this.hardcodedAuthenticationService.authenticate(this.username, this.password)) {
  //     this.invalidLogin = true;
  //   } else {
  //     this.invalidLogin = false;
  //     this.router.navigate(['welcome/', this.username]);
  //   }
  // }

  handleBasicAuthLogin() {
    this.basicAuthenticationService.executeAuthenticationService(this.username, this.password).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['welcome/', this.username]);
        this.invalidLogin = false;
      },
      error => {
        console.log(error);
        this.invalidLogin = true;
      }
    )
  }

  handleJWTAuthLogin() {
    let encryptedPassword = window.btoa(`${this.username}:${this.password}`);
    // const salt = bcrypt.genSaltSync(10);
    // encryptedPassword = bcrypt.hashSync(this.password, 10);
    console.log(encryptedPassword);
    this.basicAuthenticationService.executeJWTAuthenticationService(this.username, encryptedPassword).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['welcome/', this.username]);
        this.invalidLogin = false;
      },
      error => {
        console.log(error);
        this.invalidLogin = true;
      }
    )
  }
}
