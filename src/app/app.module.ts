import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { SeverityComponent } from './severity/severity.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { User } from './models/User';
import { DatePipe } from '@angular/common';
import { AuthenticationRequest } from './models/AuthenticationRequest';
import { LoginStatus } from './models/LoginStatus';
import { ProjectDetails } from './models/ProjectDetails';
import { SecurityToken } from './models/SecurityToken';
import { SpecialFLag } from './models/SpecialFLag';
import { ChecklistService } from './services/checklist.service';
import { SeverityService } from './services/severity.service';
import { AuthorizationService } from './services/authorization.service';
import { TokenInterceptorService } from './services/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ChecklistComponent,
    SeverityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    ChecklistService,
    SeverityService,
    DatePipe,
    AuthenticationRequest,
    SecurityToken,
    LoginStatus,
    ProjectDetails,
    SpecialFLag,
    User,
    AuthorizationService,
    {   // for token interceptor
      provide : HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
