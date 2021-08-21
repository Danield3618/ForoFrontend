import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from '../../servicio/login.service';
import { BuscarService } from '../../servicio/buscar.service';
import { PostsService } from '../../servicio/posts.service';
import { FriendsService } from '../../servicio/friends.service';

import { Amigo } from '../../modelos/amigo';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css'],
})
export class ResultadosComponent implements OnInit {
  data: any;
  amigos: any = [];
  puerto: string = 'http://localhost:3000/static/imagenes/';
  busqueda: string;
  auxVal: any = [];
  estadoSolicitud: number;
  dataAmigo: Amigo = {
    IdUsuarioFromFK: 0,
    IdUsuarioToFK: 0,
    Estado: 0,
  };
  solicitud: boolean = false;
  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private FriendsService: FriendsService,
    private BuscarService: BuscarService,
    private router: Router,
    private postService: PostsService
  ) {}

  ngOnInit(): void {
    var key = localStorage.getItem('id');
    if (key=='1') {
      this.router.navigate(['login']);
    }
    this.loginService.checkSession(key).subscribe(
      (res) => {
        this.data = res;
        this.busqueda = this.activatedRouter.snapshot.paramMap.get('search');
        this.FriendsService.buscarUser(this.data.IdUsuario,this.busqueda).subscribe((res) => {
          this.amigos = res;
        });
      },
      (err) => {
        localStorage.removeItem('id');
        this.router.navigate(['login']);
      }
    );
  }
  agregar(id: number) {
    this.dataAmigo.IdUsuarioToFK = id;
    this.dataAmigo.IdUsuarioFromFK = this.data.IdUsuario;
    console.log(this.dataAmigo);

    this.FriendsService.crearAmigo(this.dataAmigo).subscribe((res) => {
      console.log(res);
      window.location.reload();
    });
  }
  viewProfile(idUserProfile: number) {
    if (idUserProfile == this.data.IdUsuario) {
      this.router.navigate(['profile']);
    } else {
      this.postService.putUser(idUserProfile);
      this.router.navigate(['userProfile']);
    }
  }
}
