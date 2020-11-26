import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//defining a bean which will be used to map the response back
export class HelloWorldBean {
  constructor(public message: string) { }
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(
    private http: HttpClient
  ) { }

  executeHelloWorldBeanService() {
    //using generics<> the response would get mapped back to the HelloWorldBean using the constructor with message variable
    return this.http.get<HelloWorldBean>("http://localhost:8080/hello-world-bean");
  }
}
