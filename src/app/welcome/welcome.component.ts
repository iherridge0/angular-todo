import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelloWorldBean, WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  name: string = ''
  welcomeMessageFromService: string = '';

  constructor(
    private route: ActivatedRoute,
    private welcomeDataService: WelcomeDataService
  ) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.params['name'];
  }

  getWelcomeMessage() {
    //Creates an observable
    //console.log(this.welcomeDataService.executeHelloWorldBeanService());

    //asyncronous call
    //- what should we do when we get the response back?
    this.welcomeDataService.executeHelloWorldBeanWithPathVariable(this.name).subscribe(
      //Whenever a response comes back, do this:
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResonse(error)
    );
  }

  handleSuccessfulResponse(response: HelloWorldBean) {
    this.welcomeMessageFromService = response.message;
  }

  handleErrorResonse(error: any) {
    //message is in error.message
    this.welcomeMessageFromService = error.error.message;

  }

}
