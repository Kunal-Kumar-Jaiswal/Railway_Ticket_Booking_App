import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user : any;
  isEditMode = false;
  username : FormControl;
  dob : FormControl;
  mobile : FormControl;
  updateProfile : FormGroup;
  constructor(private auth: AuthService, private route : RouterService) { }

  ngOnInit(): void {
    this.auth.getUser().subscribe(
      data => {
        this.user = data, 
        this.username = new FormControl(this.user.username,[Validators.required, Validators.minLength(5), this.noWhitespaceValidator]);
        this.dob = new FormControl(this.user.dob.toString().split("T")[0], [Validators.required]);
        this.mobile = new FormControl(this.user.mobile, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[7-9]{1}[0-9]{9}$")]);
        this.updateProfile =  new FormGroup({
          username : this.username,
          dob :this.dob,
          mobile : this.mobile
        });
      },
      error => {console.log("User is not present")});
  }

  update() {
    this.user.username = this.updateProfile.get("username").value,
    this.user.dob = this.updateProfile.get("dob").value,
    this.user.mobile = this.updateProfile.get("mobile").value

    this.auth.update(this.user).subscribe(
      data => {this.user = data, console.log(this.user)},
      error => {console.log("User is not present")}); 
      
    this.isEditMode = false;
  }

  getProfilePic() {
    return sessionStorage.getItem("image");
  }

  onChangeState() {
    this.isEditMode = !this.isEditMode;
  }

  deleteUser() {
    this.auth.deleteUser().subscribe(
      data => {},
      error => {console.log("Successfully deleted"),this.auth.logout()}); 
  }

  cancel() {
    this.isEditMode = false;
    this.route.routeToProfile();
  }

  public noWhitespaceValidator(control: FormControl) {
    const val = control.value;
    const isWhitespace = (control.value || '').trim().length < val.length;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

}
