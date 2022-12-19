import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectDetails } from '../models/ProjectDetails';
import { User } from '../models/User';
import { SecurityService } from '../services/security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router:Router,
    public user:User,
    private projectDetails:ProjectDetails,
    private securityService:SecurityService
  ) { }

  public username : string = "";
  public password : string ="";
  public message : string = ""; 
  ngOnInit(): void {
    this.message = "";
    //health-check
    this.securityService.healthCheck().subscribe(
      (data)=>{
      },
      ()=>{
        //init jtwtoken in not localstorage
        this.securityService.checkAuthFromLocal('login', 'login');
      }
    );
  
  }

  onLogin(){
    this.securityService.healthCheck().subscribe(
      (data)=>{
      },
      (err)=>{
        this.securityService.resetAll();
      },
      ()=>{
        this.securityService.createSecuritytokenObservable(this.username, this.password).subscribe(
          data => {
              //checks
              if(data.includes(".")){
                this.message = "";
                this.securityService.setLoginStatus(true);
                this.securityService.turnOnSpecialFlag();
                this.securityService.setSecurityToken(data);
              }
          },
          err => {
              this.message = "Give Proper Username and Password!!!";
          },
          () => {
            // routes based on authenticationStatus
              if(this.securityService.getLoginStatus()){
                this.securityService.validateToken(this.securityService.getSecurityToken()).subscribe(
                  (data) => {
                    //checks
                    this.projectDetails.Name = data.name;
                    this.projectDetails.ProjectName = data.projectName;
                    this.projectDetails.Valid = data.valid;
                    
                  },
                  err =>{
    
                  },
                  ()=>{
                    // sets the localstorage
                    localStorage.setItem("auditToken", this.securityService.getSecurityToken());
                    console.log(this.securityService.getSecurityToken());
                    // routes to checklist
                    this.router.navigate(['checklist']);            
                  }
                );
              }
          }
        );
      }
    );
  }

}
