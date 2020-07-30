import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class DialogflowService {
   count = 0;
   loading = false;
   startChat = false;
   error = false;
   testb=false ;
   testtxt=''
   btnTxt:string = '';

  // private ApiUrl = `${environment.serverUrl}/dialogflow`;
  private ApiUrl = `${environment.serverUrl}/chat`;

  

  private sender = 'bot';

  constructor(private http: HttpClient) {}

  public getResponse(data: string,userID:string) {
  console.log(data, userID)
    return this.http
      .post<{'status':string,'reply':string}>(`${this.ApiUrl}`, {username:userID ,message: data },);
  }



  // getResponse(data: string) {
    
  //   console.log("services=> ",data)
   
  //   return this.http.post<{message: string, state: string}>("/dialogflow", {message:data})
  // }




  setSender(sender: string) {
    this.sender = sender;
  }

  get getSender(): string {
    return this.sender;
  }
}
