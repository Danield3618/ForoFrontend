import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from '../../servicio/login.service';
import { BuscarService } from '../../servicio/buscar.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  data: any = [];
  puerto: string = 'https://c6760e0d1f74.ngrok.io/static/imagenes/';
  buscar: FormGroup;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private BuscarService: BuscarService,
    private router: Router
  ) {
    this.buscar = this.formBuilder.group({
      campoBuscar: ['', Validators.compose([Validators.required,Validators.pattern(/^[A-Za-z 0-9]+$/)])],
    });
  }

  ngOnInit(): void {
    var key = localStorage.getItem('id');
    if (key=='1') {
      this.router.navigate(['login']);
    }
    this.loginService.checkSession(key).subscribe(
      (res) => [(this.data = res)],
      (err) => {
        localStorage.removeItem('id');
        this.router.navigate(['login']);
      }
    );
  }
  buscarData() {
    this.router.navigate(['resultados/'+this.buscar.value.campoBuscar]);
  }
  salir(){
    this.data.SesionTokken="1";
    this.loginService.updateLog(this.data,this.data.IdUsuario).subscribe(res=>{
      this.router.navigate(['login']);
    })
  }
}
