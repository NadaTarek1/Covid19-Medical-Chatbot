import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { stringify } from '@angular/core/src/util';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  apiURL = environment.serverUrl
  constructor(private http:HttpClient) { }
  login(formValue){
    let body= {
      'username':formValue.username,
      'password':formValue.password,
    }

    return this.http.post<{'status':string,'data':{'id':string,'username':string}}>(`${this.apiURL}/login`,body)
  }
}
