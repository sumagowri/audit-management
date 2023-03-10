import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Question } from '../models/Question';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  constructor(private http:HttpClient) { }

  readonly APIUrl="http://localhost:8200/checklist";
  private _responses: Question[] = [];

  public get responses(): Question[] {
    return this._responses;
  }

  getQuestionsFromMS(type: string) : Observable<Question[]> {
    //let params1=new HttpParams().set('type','Internal');
    console.log(type);
    return this.http.get<Question[]>(`${this.APIUrl}/auditchecklistquestions/${type}`,{
      headers: new HttpHeaders().set("Authorization", "Bearer "+localStorage.getItem('authToken'))
    });
    
  }

  healthCheck() : Observable<any> {
    return this.http.get<any>(this.APIUrl+'/health-check',{responseType:'text' as 'json'});
  }

  getResponse(responses: Question[]) : void {
    this._responses = responses;
    //this.sendResponse();
  }
  
  sendResponse() : Question[] {
    return this._responses;
  }
  
  validated(questions: Question[]) {
    for(let q of questions){
      if(q.response!="YES" && q.response!="NO"){
        return false;
      }
    }
    this._responses=questions;
    return true;
  }
  
  getAuditType() : string{
    return this._responses[0].auditType;
  }

  
  
}
