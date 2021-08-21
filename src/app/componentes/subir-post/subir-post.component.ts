import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PostsService } from '../../servicio/posts.service';
import { Post } from 'src/app/modelos/post';
import { LoginService } from '../../servicio/login.service';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-subir-post',
  templateUrl: './subir-post.component.html',
  styleUrls: ['./subir-post.component.css'],
})
export class SubirPostComponent implements OnInit {
  @ViewChild('fotoclick', { static: false }) fotoclick: ElementRef;
  photoSelected: string | ArrayBuffer;
  file: File;

  post: any = [];
  data: any = [];
  tema_db: any = [];
  subirPost: FormGroup;
  idImg: any = [];
  nombreIMG: string;

  puerto: string = 'http://localhost:3000/static/imagenes/';

  Post: Post = {
    IdUsuarioFK: 0,
    FechaPublicacion: null,
    FechaEdicion: null,
    IdImagenFK: null,
    IdTemaFK: 0,
    TituloPublicacion: '',
    CuerpoPublicacion: '',
  };
  constructor(
    private loginService: LoginService,
    private postService: PostsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.subirPost = this.formBuilder.group({
      TituloPublicacion: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(40),
          Validators.pattern(/^[A-Za-z 0-9]+$/),
        ]),
      ],
      IdTemaFK: ['', Validators.required],
      CuerpoPublicacion: [
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
    this.postService.tema().subscribe((res) => [(this.tema_db = res)]);
    var key = localStorage.getItem('id');
    if (key=='1') {
      this.router.navigate(['login']);
    }
    this.loginService.checkSession(key).subscribe((res) => [(this.data = res)]);
  }

  createPost() {
    this.post = this.subirPost.value;
    this.post.IdUsuarioFK = this.data.IdUsuario;
    const imagen = this.fotoclick.nativeElement.files[0];
    if (this.fotoclick.nativeElement.files[0]) {
      this.file = imagen;
      this.postService.imagenes(this.file).subscribe((res) => {
        console.log('done');
        this.nombreIMG = res.toString();
        this.postService.idImagen(this.nombreIMG).subscribe((res) => {
          this.idImg = res;
          this.post.IdImagenFK = this.idImg.IdImagen;
          this.postService.savePost(this.post).subscribe((res) => {
            this.router.navigate(['home']);
          });
        });
      });
    } else {
      this.post.IdImagenFK = 1;
      this.postService.savePost(this.post).subscribe((res) => {
        this.router.navigate(['home']);
      });
    }
  }
  fotoPreview(event: HtmlInputEvent) {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.photoSelected = reader.result);
      reader.readAsDataURL(this.file);
    }
  }
}
