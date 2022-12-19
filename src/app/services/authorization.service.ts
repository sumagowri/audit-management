import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthenticationRequest } from '../models/AuthenticationRequest';
import { Microservices } from '../models/Microservices';
import { ProjectDetailsInterface } from '../models/ProjectDetailsInterface';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  constructor(private authClient : HttpClient) { }

  authenticate(authRequest : AuthenticationRequest){
    // make rest call [POST] to /authenticate with authRequest as Request-body
    return this.authClient.post(Microservices["auth"]+"/authenticate", authRequest, 
                          { responseType : 'text'});
  }

  validate(securityToken : string){
    return this.authClient.post<ProjectDetailsInterface>(Microservices["auth"]+"/validate", 
      {
        headers: new HttpHeaders().set("Authorization", "Bearer "+securityToken)
      });
  }

  healthCheck(){
    return this.authClient.get(Microservices["auth"]+"/health-check", {
      responseType : 'text'
    });
  }
}
