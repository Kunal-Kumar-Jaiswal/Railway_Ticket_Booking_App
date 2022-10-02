import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private route : RouterService, public auth : AuthService) { }

  ngOnInit(): void {
  }

  getProfilePic() {
    return sessionStorage.getItem('image');
  }
}
