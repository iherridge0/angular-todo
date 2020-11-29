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

  message: string = '';
  username: string = '';
  todos: Todo[] = [];


  constructor(
    private todoDataService: TodoDataService,
    private authenticationService: HardcodedAuthenticationService
  ) { }

  ngOnInit(): void {

    this.refreshTodos();
  }

  deleteTodo(id: number) {
    this.todoDataService.deleteTodo(this.username, id).subscribe(
      response => {
        console.log(response)
        this.message = `Todo item of ${id} deleted`
        setTimeout(() => {
          console.log('sleep');
          this.message = '';
        }, 5000);
      }
    );
  }

  refreshTodos() {
    this.username = this.authenticationService.getAuthenticatedUser();
    this.todoDataService.getAllTodos(this.username).subscribe(
      response => {
        console.log(response);
        this.todos = response;
      }
    );
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
