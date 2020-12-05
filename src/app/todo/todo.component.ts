import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoDataService } from '../service/data/todo-data.service';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { Todo } from '../list-todos/list-todos.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todo: any;
  username = '';
  id = 0;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private todoDataService: TodoDataService,
    private authenticationService: HardcodedAuthenticationService
  ) {

  }

  ngOnInit(): void {
    this.username = this.authenticationService.getAuthenticatedUser();
    this.id = this.route.snapshot.params['id'];
    this.todoDataService.retrieveTodo(this.username, this.id).subscribe(
      response => {
        console.log(response);
        this.todo = response;
      }
    );
  }

  saveTodo() {
    this.todoDataService.saveTodo(this.username, this.todo).subscribe(
      response => {
        console.log(response);
      }
    );
    this.router.navigate(['todos/']);
  }

}
