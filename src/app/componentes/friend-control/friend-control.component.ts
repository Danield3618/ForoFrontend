import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../../servicio/login.service';
import { FriendsService } from '../../servicio/friends.service';

import { Amigo } from '../../modelos/amigo';
import { Sala } from '../../modelos/sala';
@Component({
  selector: 'app-friend-control',
  templateUrl: './friend-control.component.html',
  styleUrls: ['./friend-control.component.css'],
})
export class FriendControlComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private FriendsService: FriendsService,
    private router: Router
  ) {}

  data2: any = [];
  amigos: any = [];
  puerto: string = 'http://localhost:3000/static/imagenes/';
  dataAmigo: Amigo = {
    IdUsuarioFromFK: 0,
    IdUsuarioToFK: 0,
    Estado: 0,
  };
  dataSala:Sala={
    IdAmigoFk: 0
  }

  ngOnInit(): void {
    var key = localStorage.getItem('id');
    
    if (key=='1') {
      this.router.navigate(['login']);
    }
    this.loginService.checkSession(key).subscribe(
      (res) => {
        this.data2 = res;

        this.FriendsService.pendientes(this.data2.IdUsuario).subscribe(
          (res) => {
            this.amigos = res;
          }
        );
      },
      (err) => {
        localStorage.removeItem('id');
        this.router.navigate(['login']);
      }
    );
  }
  aceptar(idAmigo: number, idFrom: number, idTo: number) {
    this.dataAmigo.Estado = 1;
    this.dataAmigo.IdUsuarioFromFK = idFrom;
    this.dataAmigo.IdUsuarioToFK = idTo;
    this.FriendsService.actualizarAmigo(this.dataAmigo, idAmigo).subscribe(
      (res) => {
        this.dataSala.IdAmigoFk=idAmigo;
        this.FriendsService.crearSala(this.dataSala).subscribe(res=>{
          window.location.reload();
        });
      }
    );
  }
  rechazar(idAmigo: number) {
    this.FriendsService.eliminarAmigo(idAmigo).subscribe(res=>{
      window.location.reload();
    })
  }
}
