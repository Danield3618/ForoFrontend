import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import {Post} from '../modelos/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  direccion ="http://localhost:3000/api"
  constructor(private http:HttpClient) { }

  getPosts(){
    return this.http.get(`${this.direccion}/post`);
  }

  getPost(id:string){
    return this.http.get(`${this.direccion}/post/`+id);
  }

  savePost(post:Post){
    return this.http.post(`${this.direccion}/post`,post);
  }

  deletePost(id:string){
    return this.http.delete(`${this.direccion}/post/$id`);
  }
  
  updatePost(id:string, update:Post){
    return this.http.put(`${this.direccion}/post/$id`,update);
  }
}
