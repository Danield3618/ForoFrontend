import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Mensaje } from '../modelos/mensaje';


@Injectable({
  providedIn: 'root'
})
export class ChatsService {
  direccion = 'http://localhost:3000/api/mensaje';

  constructor(private http: HttpClient) { }

list(id:number){
  return this.http.get(`${this.direccion}/`+id);
}

create(mensaje:Mensaje){
  return this.http.post(`${this.direccion}/`,mensaje);
}

}
