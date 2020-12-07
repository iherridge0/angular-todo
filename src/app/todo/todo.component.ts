import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoDataService } from '../service/data/todo-data.service';
import { Todo } from '../list-todos/list-todos.component';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todo: Todo = new Todo(0, '', false, new Date());
  username = '';
  id = 0;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private todoDataService: TodoDataService,
    private basicAuthenticationService: BasicAuthenticationService
  ) {

  }

  ngOnInit(): void {
    this.username = this.basicAuthenticationService.getAuthenticatedUser();
    this.todo.id = this.route.snapshot.params['id'];
    if (this.todo.id != -1) {
      this.todoDataService.retrieveTodo(this.username, this.todo.id).subscribe(
        response => {
          console.log(response);
          this.todo = response;
        }
      );
    }
  }

  saveTodo() {
    if (this.todo.id === -1) {
      //Create Todo
      this.todoDataService.createTodo(this.username, this.todo).subscribe(
        response => {
          console.log(response);
        }
      );
    } else {
      //Update Todo
      this.todoDataService.saveTodo(this.username, this.todo).subscribe(
        response => {
          console.log(response);
        }
      );
    }
    this.router.navigate(['todos/']);
  }
}
