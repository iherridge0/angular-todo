import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ) { }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  errorMessage: string = '';
  username: string = '';
  todos: Todo[] = [];


  constructor(
    private todoDataService: TodoDataService,
    private authenticationService: HardcodedAuthenticationService
  ) { }

  ngOnInit(): void {

    this.username = this.authenticationService.getAuthenticatedUser();
    this.todoDataService.getAllTodos(this.username).subscribe(
      response => {
        console.log(response);
        this.todos = response;
      }
    );
  }


}
