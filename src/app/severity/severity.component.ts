import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuditResponse } from '../models/AuditResponse';
import { ChecklistService } from '../services/checklist.service';
import { SecurityService } from '../services/security.service';
import { SeverityService } from '../services/severity.service';

@Component({
  selector: 'app-severity',
  templateUrl: './severity.component.html',
  styleUrls: ['./severity.component.css']
})
export class SeverityComponent implements OnInit {

  status:string="";
  auditResponse:AuditResponse = {
    auditId: 0,
    managerName: "",
    projectExecutionStatus: "",
    projectName: "",
    remedialActionDuration: ""
  };
  
  constructor(
    private service:SeverityService,
    private router : Router,
    private securityService : SecurityService,
    private checklistService : ChecklistService
  ) {  }
  
  getExecutionStatus() : void {
  let fetch : AuditResponse; 
  this.service.executionStatus()
  .subscribe(
      data => {
          fetch = data;
          //console.log(data);
          if(data.auditId==0){  //valid check
            this.router.navigate(['backToLogin']);
          }
      }, 
      (err)=>{}, 
      ()=>{
        this.auditResponse = fetch;
        this.status = this.auditResponse.projectExecutionStatus;
      }
      );
  }
  
  ngOnInit(): void {
    this.status = "";
    this.securityService.healthCheck().subscribe(
      (data)=>{
      },
      (err)=>{
        // this.router.navigate(['error']); meee
      },
      ()=>{
        this.service.benchHealthCheck().subscribe(
          (data)=>{
          },
          (err)=>{
            // this.router.navigate(['error']);  meee
          },
          ()=>{
            this.service.auditHealthCheck().subscribe(
              (data)=>{
              },
              (err)=>{
                // this.router.navigate(['error']);  meee
              },
              ()=>{
                  this.securityService.checkAuthFromLocal("severity", "backToLogin");
                  if(localStorage.getItem("auditToken")!=null){
                    if(this.securityService.getLoginStatus() && !this.securityService.getSpecialFlag()){
                      this.getExecutionStatus();
                    }
                    else if(this.securityService.getLoginStatus() || !this.securityService.getSpecialFlag()){
                      this.securityService.turnOnSpecialFlag();
                      this.router.navigate(["checklist"]);
                    }
                    else{
                      this.router.navigate(['login']);
                    }
                  }
                  else{
                    this.router.navigate(['login']);
                  }
              });
          });
      });
  }

  backToChecklist(){
    this.router.navigate(['checklist']);
  }

}
