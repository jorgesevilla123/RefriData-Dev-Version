import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInStatus: boolean = false

  constructor() { }




  setLoggedIn(value: boolean){
    this.loggedInStatus = value;


  }

  get isLoggedIn() {
    return this.loggedInStatus
  }





}
