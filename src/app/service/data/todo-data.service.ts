import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../../list-todos/list-todos.component';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(
    private http: HttpClient
  ) { }

  getAllTodos(username: string) {
    return this.http.get<Todo[]>(`http://localhost:8080/users/${username}/todos`);
  }

  deleteTodo(username: string, id: number) {

    return this.http.delete(`http://localhost:8080/users/${username}/todos/${id}`);
  }

  retrieveTodo(username: string, id: number) {

    return this.http.get<Todo>(`http://localhost:8080/users/${username}/todos/${id}`);
  }

  saveTodo(username: string, todo: Todo) {
    return this.http.put(`http://localhost:8080/users/${username}/todos/${todo.id}`, todo);
  }

  createTodo(username: string, todo: Todo) {
    return this.http.post(`http://localhost:8080/users/${username}/todos/${todo.id}`, todo);
  }
}
