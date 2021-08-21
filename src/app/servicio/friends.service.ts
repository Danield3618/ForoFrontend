import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Amigo } from '../modelos/amigo';
import { Sala } from '../modelos/sala';
@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  direccion ="http://localhost:3000/api/amigo/"
  constructor(private http:HttpClient) { }

  getFriends(id:number){
    return this.http.get(`${this.direccion}`+id);
  }
  users(id:number){
    return this.http.get(`${this.direccion}user/`+id);
  }
  buscarUser(id:number,nombre:string){
    return this.http.get(`${this.direccion}users/`+id+','+nombre);
  }
  crearAmigo(dato:Amigo){
    return this.http.post(`${this.direccion}`,dato);
  }
  crearSala(data:Sala){
    return this.http.post(`${this.direccion}sala/`,data);
  }
  buscarSala(id:number){
    return this.http.get(`${this.direccion}sala/`+id);
  }
  actualizarAmigo(dato:Amigo, id:number){
    return this.http.put(`${this.direccion}`+id,dato);
  }
  eliminarAmigo(id:number){
    return this.http.delete(`${this.direccion}`+id);
  }
  pendientes(id:number){
    return this.http.get(`${this.direccion}pendiente/`+id);
  }
}
