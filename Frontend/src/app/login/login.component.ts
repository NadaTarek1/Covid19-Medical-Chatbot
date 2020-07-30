import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
userName;
password;
loginForm:FormGroup;
  constructor(private router:Router,
              private autenticationService:AuthenticationService,
              private formBuilder:FormBuilder) { 
                this.loginForm = formBuilder.group({
                  username:['',Validators.compose([Validators.required])],
                  password:['',Validators.compose([Validators.required])]
                })
              }

  ngOnInit() {
  }
login(formValue){
  this.autenticationService.login(formValue).subscribe(res=>{
    let id = res.data.id
    localStorage.setItem('id',id)
    this.router.navigate(["/talk"]);
  },err=>{
    alert("invalid username or password")

  })
  
  
}
}
