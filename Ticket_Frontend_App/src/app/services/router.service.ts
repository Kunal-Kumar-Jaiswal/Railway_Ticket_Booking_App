import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Train } from '../model/Train';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  routeToProfile() {
    this.router.navigate(["/profile"]);
  }
  routeToTrains(from : string,to : string,date : string) {
    this.router.navigate(["train/"+from+"/"+to+"/"+date]);
  }

  constructor(private router : Router) {}

  routeToHome() {
    this.router.navigate(["/"]);
  }

  routeToLogin() {
    this.router.navigate(["login"]);
  }

  routeToTickets() {
    this.router.navigate(["view-ticket"]);
  }
}
