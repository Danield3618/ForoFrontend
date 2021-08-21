import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import {Log_u} from '../modelos/log_user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  direccion ="http://localhost:3000/api/login"
  constructor(private http:HttpClient) { }

  getLog(search:Log_u){
    return this.http.post(`${this.direccion}`,search);
  }
  deleteLog(id:string){
    return this.http.delete(`${this.direccion}/$id`);
  }
  updateLog(log:Log_u,id:string){
    return this.http.post(`${this.direccion}/`+id,log);
  }
  checkSession(session:string){
    return this.http.get(`${this.direccion}/`+session);
  }

}