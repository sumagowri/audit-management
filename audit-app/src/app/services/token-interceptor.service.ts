import { HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(
    private securityService : SecurityService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler){
    let requestWithHeader = req.clone({
      setHeaders : {  // creating the authorization header
        Authorization : "Bearer " + this.securityService.getSecurityToken()
      }
    })
    return next.handle(requestWithHeader)
  }
}
