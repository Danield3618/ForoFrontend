import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Post } from '../modelos/post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  direccion = 'http://localhost:3000/api';
  id;
  idUser;
  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get(`${this.direccion}/post`);
  }

  getPost(id: string) {
    return this.http.get(`${this.direccion}/post/` + id);
  }
  getPostUser(id: string) {
    return this.http.get(`${this.direccion}/post/` + id);
  }

  savePost(post: Post) {
    return this.http.post(`${this.direccion}/post`, post);
  }

  deletePost(id: string) {
    return this.http.delete(`${this.direccion}/post/` + id);
  }

  updatePost(id: string, update: Post) {
    return this.http.put(`${this.direccion}/post/`+id, update);
  }

  tema() {
    return this.http.get(`${this.direccion}/tema`);
  }

  imagenes(foto: File) {
    const imagen = new FormData();
    imagen.append('image', foto);
    return this.http.post(`${this.direccion}/imagen`, imagen);
  }

  idImagen(nombre: string) {
    return this.http.get(`${this.direccion}/imagen/` + nombre);
  }

  getPostData(id: string) {
    return this.http.get(`${this.direccion}/post/edit/` + id);
  }

  putId(dato: string) {
    this.id = dato;
  }
  getId() {
    return this.id;
  }
  putUser(id: number){
    this.idUser = id;
  }
  getUser() {
    return this.idUser;
  }
}
