import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from '../../servicio/login.service';
import { Post } from 'src/app/modelos/post';
import { PostsService } from '../../servicio/posts.service';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-editar-post',
  templateUrl: './editar-post.component.html',
  styleUrls: ['./editar-post.component.css'],
})
export class EditarPostComponent implements OnInit {
  @ViewChild('fotoclick', { static: false }) fotoclick: ElementRef;

  puerto: string = 'http://localhost:3000/static/imagenes/';
  data2: any = [];
  post: any = [];
  dataaux: any = [];
  photoSelected: string | ArrayBuffer;
  file: File;
  tema_db: any;
  editarPost: FormGroup;
  idPost: any;
  idImg: any = [];
  nombreIMG: string;


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
    this.editarPost = this.formBuilder.group({
      TituloPublicacion: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(40),Validators.pattern(/^[A-Za-z 0-9]+$/)]),
      ],
      IdTemaFK: ['', Validators.required],
      CuerpoPublicacion: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(255),Validators.pattern(/^[A-Za-z 0-9]+$/)]),
      ],
    });
  }

  ngOnInit(): void {
    this.idPost = this.postService.getId();
    
    if (key=='1') {
      this.router.navigate(['login']);
    }
    this.postService.tema().subscribe((res) => [(this.tema_db = res)]);
    var key = localStorage.getItem('id');
    this.loginService.checkSession(key).subscribe(
      (res) => {
        this.dataaux = res;
        this.postService.getPostData(this.idPost).subscribe(
          (res) => {
            this.data2 = res;
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

  actualizarPost() {
    this.post = this.editarPost.value;
    this.post.IdUsuarioFK = this.dataaux.IdUsuario;
    const imagen = this.fotoclick.nativeElement.files[0];
    if (this.fotoclick.nativeElement.files[0]) {
      this.file = imagen;
      this.postService.imagenes(this.file).subscribe((res) => {
        console.log('done');
        this.nombreIMG=res.toString()
        this.postService.idImagen(this.nombreIMG).subscribe((res) => {
          this.idImg = res;
          this.post.IdImagenFK = this.idImg.IdImagen;
          this.postService.updatePost(this.idPost,this.post).subscribe((res) => {
            this.router.navigate(['home']);
          });
        });
      });
    } else {
      this.post.IdImagenFK = 1;
      this.postService.updatePost(this.idPost,this.post).subscribe((res) => {
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
