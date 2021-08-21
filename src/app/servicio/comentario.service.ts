import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Comentario } from '../modelos/comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  direccion = 'http://localhost:3000/api';


  constructor(private http: HttpClient) { }

  guardarComentario(comentario:Comentario){
    return this.http.post(`${this.direccion}/comentario`, comentario);
  }

  listarComentarios(id:number,limit:number){
    return this.http.get(`${this.direccion}/comentario/list/`+id+","+limit);
  }


}
