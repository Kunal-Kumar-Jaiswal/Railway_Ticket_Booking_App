import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/User';
import { RouterService } from './router.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(private httpClient : HttpClient, private routerService : RouterService) { }

  login(user : User) {
    return this.httpClient.post("http://localhost:8085/login",user); 
  }

  register(user: User) {
    console.log(user);
    this.httpClient.post("http://localhost:8085/add",user)
    .subscribe(data => {console.log("registration successful")},
              error => {console.log("Registration failed")});
  }

  update(user :User) {
    return this.httpClient.put("http://localhost:8085/update",user);
  }

  getUser() {
    return this.httpClient.get(`http://localhost:8085/email/${sessionStorage.getItem("token")}`);
  }

  isAuthenticated() {
    if(sessionStorage.getItem("token")) {
      return true;
    }
    return false;
  }

  isUserAuthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        if (sessionStorage.getItem('token')) {
          resolve(true);
        } else {
          reject(false);
        }
      }
    );
    return promise;
  }

  deleteUser() {
    return this.httpClient.delete(`http://localhost:8085/delete/${sessionStorage.getItem("token")}`)
  }

  logout() {
    console.log("in logout");
    sessionStorage.clear();
    localStorage.clear();
    this.routerService.routeToHome();
  }
}
