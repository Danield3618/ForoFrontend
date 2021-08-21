import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from '../../servicio/login.service';
import { FriendsService } from '../../servicio/friends.service';
import { PostsService } from '../../servicio/posts.service';
import { ChatsService } from '../../servicio/chats.service';
import { Mensaje } from 'src/app/modelos/mensaje';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  puerto: string = 'http://localhost:3000/static/imagenes/';
  dataaux: any = [];
  amigos: any = [];
  auxMensaje: any = [];
  auxIdAmigo: number;
  usuarioGlobal: number;
  mensajes: any = [];
  mensajes2: any = [];
  mensajeEnviar: any = [];
  chatUser: string;
  idSala: number;
  nuevoMensaje: FormGroup;
  insertarMensaje: Mensaje = {
    IdSalaFk: 0,
    IdUsuarioFromFK: 0,
    Mensaje: '',
  };
  constructor(
    private loginService: LoginService,
    private FriendsService: FriendsService,
    private postService: PostsService,
    private activatedRouter: ActivatedRoute,
    private ChatsService: ChatsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.nuevoMensaje = this.formBuilder.group({
      Mensaje: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(500),Validators.pattern(/^[A-Za-z @.,:;0-9]+$/)]),
      ],
    });
  }

  ngOnInit(): void {
    var key = localStorage.getItem('id');
    if (key=='1') {
      this.router.navigate(['login']);
    }
    this.chatUser = this.activatedRouter.snapshot.paramMap.get('apodo');
    this.loginService.checkSession(key).subscribe(
      (res) => {
        this.dataaux = res;
        this.FriendsService.getFriends(this.dataaux.IdUsuario).subscribe(
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
  cargarChat(idAmigo: number) {
    this.auxIdAmigo = idAmigo;
    this.FriendsService.buscarSala(idAmigo).subscribe((res) => {
      this.auxMensaje = res;
      this.idSala = this.auxMensaje.IdSala;
      this.ChatsService.list(this.idSala).subscribe((res) => {
        this.mensajes = res;
        this.verificarCambios(idAmigo);
      });
    });
  }
  enviarMensaje() {
    this.mensajeEnviar = this.nuevoMensaje.value;
    this.mensajeEnviar.IdUsuarioFromFK = this.dataaux.IdUsuario;
    this.mensajeEnviar.IdSalaFk = this.idSala;

    this.nuevoMensaje.get('Mensaje').reset();
    this.ChatsService.create(this.mensajeEnviar).subscribe((res) => {
      this.cargarChat(this.auxIdAmigo);
    });
  }
  cambiarChat(apodo: string, idUser: number, idAmigo: number) {
    this.chatUser = apodo;
    this.usuarioGlobal = idUser;
    this.router.navigate(['chat/' + apodo]);
    this.cargarChat(idAmigo);
    this.ngOnInit();
  }
  verificarCambios(idAmigo: number) {
    this.auxIdAmigo = idAmigo;
    this.FriendsService.buscarSala(idAmigo).subscribe((res) => {
      this.auxMensaje = res;
      this.idSala = this.auxMensaje.IdSala;
      this.ChatsService.list(this.idSala).subscribe((res) => {
        this.mensajes2 = res;
        if (this.mensajes != this.mensajes2) {
          this.cargarChat(idAmigo);
        }else{
          this.verificarCambios(idAmigo);
        }
      });
    });
  }
}
