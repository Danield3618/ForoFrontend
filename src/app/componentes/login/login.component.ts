import { Component, OnInit, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, provideRoutes } from '@angular/router';
import * as CryptoJS from 'crypto-js';

import { Log_u } from '../../modelos/log_user';

import { LoginService } from '../../servicio/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @HostBinding('class') clase = 'row';

  loginModel: FormGroup;
  auxMostrar: boolean = false;
  textRaw:string;
  login_u: Log_u = {
    Apodo: '',
    Password: '',
    SesionTokken: '',
  };

  errorMessage: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginModel = this.formBuilder.group({
      Apodo: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[A-Za-z0-9]+$/),
        ]),
      ],
      Password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[A-Za-z0-9]+$/),
        ]),
      ],
    });
  }

  ngOnInit(): void {
    var key: string;
    var key = Math.floor(Math.random() * (999999 - 1)).toString();
    var data = CryptoJS.SHA3(key, {
      outputLength: 256,
    }).toString();
    localStorage.setItem('id', data.toString());
  }

  Check_user() {
    this.login_u = this.loginModel.value;
    this.login_u.Password = CryptoJS.SHA3(this.login_u.Password, {
      outputLength: 256,
    }).toString();
    this.loginService.getLog(this.login_u).subscribe(
      (res) => {
        var id = res['IdUsuario'];
        var keydef = id + 'a' + localStorage.getItem('id');
        keydef = CryptoJS.SHA3(keydef, {
          outputLength: 256,
        }).toString();
        localStorage.setItem('id', keydef);
        this.login_u.SesionTokken = localStorage.getItem('id');
        this.loginService.updateLog(this.login_u, id).subscribe((res) => {
          this.router.navigate(['home']);
        });
      },
      (err) => {
        localStorage.removeItem('id');
        this.ngOnInit();
        this.loginModel.reset();
        this.errorMessage = true;
      }
    );
  }
  mostrar() {
    this.textRaw=this.loginModel.value.Password
    this.auxMostrar = true;
  }
  noMostrar() {
    this.auxMostrar = false;
    this.textRaw=this.loginModel.value.Password
  }
}
