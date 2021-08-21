import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidarTextoService {
  constructor() {}

  validar(dato: string) {
    var filtro =
      'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ1234567890';
    var out = '';
    for (var i = 0; i < dato.length; i++)
      if (filtro.indexOf(dato.charAt(i)) != -1) out += dato.charAt(i);
    if (dato != out) {
      return false;
    } else {
      return true;
    }
  }
}
