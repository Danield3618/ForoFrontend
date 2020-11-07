import { Component, OnInit, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, provideRoutes } from '@angular/router';
import * as CryptoJS from 'crypto-js';

import {Log_u} from '../../modelos/log_user';

import {LoginService} from '../../servicio/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @HostBinding('class') clase='row';

  loginModel:FormGroup;

  login_u: Log_u={
    Apodo:'',
    Password:'',
    SesionTokken:''
  };

  errorMessage:boolean =false;

  constructor(private loginService:LoginService,private router:Router, private formBuilder:FormBuilder){
    this.loginModel=this.formBuilder.group({
      Apodo:['',Validators.required],
      Password:['',Validators.compose([Validators.required])]
    });
  }

  ngOnInit(): void {
    var key=Math.floor(Math.random() * (100000 - 1));
    localStorage.setItem("id",key.toString());
  }

  Check_user(){
    this.login_u=this.loginModel.value;
    this.login_u.Password=CryptoJS.SHA3(this.login_u.Password,{ outputLength: 256 }).toString();
    this.loginService.getLog(this.login_u).subscribe(
      res=>{
        var id=res["IdUsuario"];
        localStorage.setItem("id",id+"a"+localStorage.getItem("id"));
        this.login_u.SesionTokken=localStorage.getItem("id");
        this.loginService.updateLog(this.login_u,id).subscribe();
        this.router.navigate(["home"]);
      },
      err=>{
        localStorage.removeItem("id");
        this.loginModel.reset();
        this.errorMessage=true;
        console.log(this.errorMessage);
      }
    )
  }
}
