import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { TodoDataService } from '../service/data/todo-data.service';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ) { };
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
    private router: Router,
    private todoDataService: TodoDataService,
    private basicAuthenticationService: BasicAuthenticationService
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
          this.refreshTodos();
        }, 2000);

      }
    );

  }

  updateTodo(id: number) {
    this.router.navigate(['todos/', id]);
  }

  createTodo() {
    this.router.navigate(['todos/', -1]);
  }

  refreshTodos() {
    this.username = this.basicAuthenticationService.getAuthenticatedUser();
    this.todoDataService.getAllTodos(this.username).subscribe(
      response => {
        console.log(response);
        this.todos = response;
      }
    );
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
