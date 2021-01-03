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
  errorMessage = '';

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
        this.errorMessage = '';
      },
      error => {
        if(error.status == -1){
          this.errorMessage = 'The backend is currently down, please try again later';
        } else if(error.status == 409) {
          this.errorMessage = this.username + ' already exist, please try a different username.';
        } else {
          //Validation errors
          this.errorMessage = 'Check your validations';
        }
          
        console.log(error);
        
      }
    );
  }

  back(){
    this.router.navigate(['/login']);
  }

}

export class User {
  constructor(
    private username: string,
    private password: string
  ) { };
}
