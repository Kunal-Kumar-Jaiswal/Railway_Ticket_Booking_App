import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/User';
import { AuthService } from '../services/auth.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerform : FormGroup;
  email : FormControl;
  username : FormControl;
  password : FormControl;
  dob : FormControl;
  gender : FormControl;
  mobile : FormControl;
  image : FormControl;
  imageURL : string;
  constructor(private auth : AuthService, private route : RouterService) {   }

  ngOnInit(): void {
    this.email = new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(12), this.noWhitespaceValidator]);
    this.username = new FormControl('',[Validators.required, Validators.minLength(5), this.noWhitespaceValidator]);
    this.dob = new FormControl('', [Validators.required]);
    this.gender = new FormControl('', Validators.required);
    this.mobile = new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[7-9]{1}[0-9]{9}$")]);
    this.image = new FormControl('');
    this.registerform =  new FormGroup({
      email : this.email,
      username : this.username,
      password : this.password,
      dob :this.dob,
      gender : this.gender,
      mobile : this.mobile,
      image : this.image
    });
  }

  fileSelected(event) {
    console.log(event);
    const file = event.target['files'][0];
    console.log(file);
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event => {
      this.imageURL = reader.result.toString();
      console.log(this.imageURL);
    })
  }

  register() {
    console.log(this.registerform.value);
    // var email = this.registerform.get("email").value;
    // var username = this.registerform.get("username").value;
    var user : User = {
      email : this.registerform.get("email").value,
      username : this.registerform.get("username").value,
      password : this.registerform.get("password").value,
      dob : this.registerform.get("dob").value,
      gender : this.registerform.get("gender").value,
      mobile : this.registerform.get("mobile").value,
      image : this.imageURL
    }
    this.auth.register(user);
    console.log("in register");
    this.route.routeToLogin();
  }

  public noWhitespaceValidator(control: FormControl) {
    const val = control.value;
    const isWhitespace = (control.value || '').trim().length < val.length;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  cancel() {
    this.route.routeToLogin();
  }
}
