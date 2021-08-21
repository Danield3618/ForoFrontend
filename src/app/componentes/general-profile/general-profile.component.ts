import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';

import { LoginService } from '../../servicio/login.service';
import { PostsService } from '../../servicio/posts.service';
import { ComentarioService } from '../../servicio/comentario.service';

import { Comentario } from '../../modelos/comentario';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-general-profile',
  templateUrl: './general-profile.component.html',
  styleUrls: ['./general-profile.component.css'],
})
export class GeneralProfileComponent implements OnInit {
  @ViewChild('fotoclick', { static: false }) fotoclick: ElementRef;
  photoSelected: string | ArrayBuffer;
  file: File;
  nombreIMG: string;
  idImg: any = [];
  limitComentario: number = 2;

  post: any = [];
  data2: any = [];
  puerto: string = 'http://localhost:3000/static/imagenes/';
  comentarioData: FormGroup;
  listComentarios: any = [];
  activar: boolean = false;
  commentImage: boolean = false;
  auxMostrarOcultar: boolean = true;
  publicacion: number;
  auxComentarioAnterior: number;

  comentario: Comentario = {
    IdComentarioFK: null,
    FechaPublicacion: null,
    FechaEdicion: null,
    IdCalificacionFK: null,
    IdUsuarioFk: 0,
    IdPublicacionFk: 0,
    IdImagenFK: 1,
    CuerpoComentario: '',
  };

  constructor(
    private loginService: LoginService,
    private ComentarioService: ComentarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private postService: PostsService
  ) {
    this.comentarioData = this.formBuilder.group({
      CuerpoComentario: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(255),
          Validators.pattern(/^[A-Za-z 0-9]+$/),
        ]),
      ],
    });
  }

  ngOnInit(): void {
    var key = localStorage.getItem('id');
    if (key=='1') {
      this.router.navigate(['login']);
    }
    this.loginService.checkSession(key).subscribe(
      (res) => {
        this.data2 = res;
        this.postService.getPostUser(this.postService.getUser()).subscribe(
          (res) => {
            this.post = res;
          },
          (err) => console.log(err)
        );
      },
      (err) => {
        localStorage.removeItem('id');
        this.router.navigate(['login']);
      }
    );
  }

  crearComentario(idPost: number, idUser: number, idCom: number) {
    this.comentario = this.comentarioData.value;
    this.comentario.IdPublicacionFk = idPost;
    this.comentario.IdUsuarioFk = idUser;
    const imagen = this.file;
    if (this.photoSelected) {
      this.commentImage = false;
      this.file = imagen;
      this.postService.imagenes(this.file).subscribe((res) => {
        console.log('done');
        this.nombreIMG = res.toString();
        this.postService.idImagen(this.nombreIMG).subscribe((res) => {
          this.idImg = res;
          this.comentario.IdImagenFK = this.idImg.IdImagen;
          this.ComentarioService.guardarComentario(this.comentario).subscribe(
            (res) => {
              console.log(res);
              this.comentarioData.get('CuerpoComentario').reset();
              this.mostrarComentario(idPost);
            }
          );
        });
      });
    } else {
      this.comentario.IdImagenFK = 1;
      this.ComentarioService.guardarComentario(this.comentario).subscribe(
        (res) => {
          console.log(res);
          this.comentarioData.get('CuerpoComentario').reset();
          this.mostrarComentario(idPost);
        }
      );
    }
  }

  mostrarComentario(idPost: number) {
    if (this.auxMostrarOcultar || this.auxComentarioAnterior != idPost) {
      this.photoSelected = null;
      this.commentImage = false;
      this.auxMostrarOcultar = false;
      this.publicacion = idPost;
      this.activar = true;
      this.ComentarioService.listarComentarios(
        idPost,
        this.limitComentario
      ).subscribe((res) => {
        this.listComentarios = res;
      });
    } else {
      this.auxMostrarOcultar = true;
      this.activar = false;
    }
    this.auxComentarioAnterior = idPost;
  }

  fotoPreview(event: HtmlInputEvent, idPost: number) {
    if (event.target.files && event.target.files[0]) {
      this.commentImage = true;
      this.publicacion = idPost;
      this.file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.photoSelected = reader.result);
      reader.readAsDataURL(this.file);
    }
  }

  cargarMas(idPost: number, limite: number) {
    this.limitComentario = limite + 5;
    this.auxMostrarOcultar = true;
    this.mostrarComentario(idPost);
  }

  cargarMenos(idPost: number) {
    this.limitComentario = 2;
    this.auxMostrarOcultar = true;
    this.mostrarComentario(idPost);
  }
}
