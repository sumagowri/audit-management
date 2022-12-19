import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { SecurityService } from '../services/security.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private securityService : SecurityService,
    private router : Router,
    public user : User
  ) { }

  logout(){
    this.securityService.resetAll();
    this.router.navigate(['login']);
  }

  ngOnInit(): void {
    if(this.securityService.getLoginStatus()){
      let nameArray : Array<string> = this.securityService.getProjectDetails().Name.split(" ");
      this.user.username = nameArray[0] + " " + nameArray[1][0] + ".";
      this.user.logStatus = this.securityService.getLoginStatus();
    }
  }

}
