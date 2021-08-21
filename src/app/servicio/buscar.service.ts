import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BuscarService {
  direccion = 'http://localhost:3000/api';
  datoBuscar: string;

  constructor(private http: HttpClient) {}
  cargar(dato: string) {
    this.datoBuscar = dato;
  }
  getDato() {
    return this.datoBuscar;
  }
}
