import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform : FormGroup;
  email : FormControl;
  password : FormControl;

  err_msg : string;
  constructor(private auth : AuthService, private route: RouterService) { }

  ngOnInit(): void {
    this.email = new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(12), this.noWhitespaceValidator]);
    this.loginform =  new FormGroup({
      email : this.email,
      password : this.password
    });
  }

  public noWhitespaceValidator(control: FormControl) {
    const val = control.value;
    const isWhitespace = (control.value || '').trim().length < val.length;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  login() {
    this.err_msg = "";
    var user = {
      email : this.loginform.get("email").value,
      password : this.loginform.get("password").value,
      dob : null,
      gender : null,
      mobile : null,
      username : null,
      image : null
    }
    this.auth.login(user).subscribe(data => {
      sessionStorage.setItem("token",data['token']);
      sessionStorage.setItem("image",data['image']);
      console.log(data['token']);
      if(localStorage.getItem("from") == null)
        this.route.routeToHome();
      else
        this.route.routeToTrains(localStorage.getItem("from"), localStorage.getItem("to"), localStorage.getItem("date"));
    },
    error => {
      console.log("error");
      this.err_msg = "Email and password is not right";
    }
    );
  }

  cancel() {
    this.route.routeToHome();
  }

}
