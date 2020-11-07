import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { usuario} from '../modelos/usuario'
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  direccion ="http://localhost:3000/api"
  constructor(private http:HttpClient) { }
/*
  getLog(search:usuario){
    return this.http.post(`${this.direccion}`,search);
  }
  deleteLog(id:string){
    return this.http.delete(`${this.direccion}/$id`);
  }
  updateLog(log:Log_u,id:string){
    return this.http.post(`${this.direccion}/`+id,log);
  }*/
  checkNick(nick:string){
    return this.http.get(`${this.direccion}/profile/`+nick);
  }

  genero(){
    return this.http.get(`${this.direccion}/genero`);
  }

  register_user(user:usuario){
    return this.http.post(`${this.direccion}/profile`,user);
  }

  profile_image(foto:File){
    const imagen = new FormData
    imagen.append('image',foto)
    return this.http.post(`${this.direccion}/imagen`,imagen)
  }
}