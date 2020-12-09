import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../service/data/user-data.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  username = '';
  password = '';

  constructor(
    private router: Router,
    private userDataService: UserDataService
  ) { }

  ngOnInit(): void {
  }

  saveUser() {
    console.log("saving user");
    let encryptedPassword = window.btoa(`${this.username}:${this.password}`);

    // const salt = bcrypt.genSaltSync(10);
    // encryptedPassword = bcrypt.hashSync(this.password, 10);
    //console.log(encryptedPassword);
    this.userDataService.saveUser(new User(this.username, encryptedPassword)).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/']);
      },
      error => {
        console.log(error);
      }
    );
  }

}

export class User {
  constructor(
    private username: string,
    private password: string
  ) { };
}
