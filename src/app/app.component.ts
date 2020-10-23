import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import { map, filter } from "rxjs/operators";
import { UserService } from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'refri-data';

  


  constructor(
    public router: Router,
    public userService: UserService

  ) {
    

    router.events.subscribe(
      event => {
      
        if(event instanceof NavigationEnd){
          this.currentRoute = event.url
        }

      }
    )

    

  }

  currentRoute: string
  isAuthenticated: boolean


  ngOnInit(){
    this.sessionCheck();

  

  

  }


  sessionCheck(){
    return this.userService.checkSession().pipe(map( res => {
      if(!res.LOGGED_IN){
        this.isAuthenticated = 
      }
      else {

      }

    }))
  }










}
