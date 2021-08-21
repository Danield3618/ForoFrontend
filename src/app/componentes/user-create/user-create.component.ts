import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';

import { usuario } from '../../modelos/usuario';

import { UsersService } from '../../servicio/users.service';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent implements OnInit {
  @ViewChild('fotoclick', { static: false }) fotoclick: ElementRef;
  file: File;
  photoSelected: string | ArrayBuffer;
  registro: FormGroup;
  tipPer: any = [];
  errorMessage: boolean = false;
  errorImage: boolean = false;
  nombreIMG: string;

  user: usuario = {
    PrimerNombre: '',
    SegundoNombre: '',
    PrimerApellido: '',
    SegundoApellido: '',
    Correo: '',
    Apodo: '',
    Password: '',
    ImagenPerfil: '',
    Celular: 0,
    IdTipoPersonaFK: 0,
    IdRangoFK: 1,
    IdConfiguracionFK: 1,
    Descripcion: '',
  };

  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.registro = this.formBuilder.group({
      PrimerNombre: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern(/^[A-Za-z 0-9]+$/),
        ]),
      ],
      SegundoNombre: [
        '',
        Validators.compose([
          Validators.maxLength(20),
          Validators.pattern(/^[A-Za-z 0-9]+$/),
        ]),
      ],
      PrimerApellido: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern(/^[A-Za-z 0-9]+$/),
        ]),
      ],
      SegundoApellido: [
        '',
        Validators.compose([
          Validators.maxLength(20),
          Validators.pattern(/^[A-Za-z 0-9]+$/),
        ]),
      ],
      Correo: [
        '',
        Validators.compose([
          Validators.email,
          Validators.required,
          Validators.pattern(/^[A-Za-z @.0-9]+$/),
        ]),
      ],
      Apodo: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(/^[A-Za-z0-9]+$/),
        ]),
      ],
      Password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(64),
        ]),
      ],
      Celular: ['', Validators.pattern(/^[0-9]+$/)],
      IdTipoPersonaFK: ['', Validators.required],
      Descripcion: ['', Validators.pattern(/^[A-Za-z .,:;0-9]+$/)],
    });
  }
  ngOnInit(): void {
    this.userService.tipoPersona().subscribe((res) => [(this.tipPer = res)]);
  }

  validate_nick() {
    const val = this.registro.value;
    this.userService.checkNick(val.Apodo).subscribe(
      (res) => {
        this.errorMessage = true;
        this.registro.get('Apodo').reset();
        console.log('ya existe');
      },
      (err) => {
        this.errorMessage = false;
        const imagen = this.fotoclick.nativeElement.files[0];
        if (this.fotoclick.nativeElement.files[0]) {
          this.file = imagen;
          this.userService.profile_image(this.file).subscribe(
            (res) => {
              this.nombreIMG = res.toString();
              this.register();
            },
            (err) => {
              this.photoSelected = null;
              this.errorImage = true;
            }
          );
        } else {
          this.nombreIMG = 'profile.png';
          this.register();
        }
      }
    );
  }
  register() {
    //guardar datos
    this.user = this.registro.value;
    this.user.ImagenPerfil = this.nombreIMG;
    this.user.IdRangoFK = 1;
    this.user.IdConfiguracionFK = 1;
    this.user.Password = CryptoJS.SHA3(this.user.Password, {
      outputLength: 256,
    }).toString();

    //guardar imgaen

    //utiliza el servicio
    this.userService.register_user(this.user).subscribe(
      (res) => {
        this.router.navigate(['login']);
      },
      (err) => {}
    );
  }
  fotoPreview(event: HtmlInputEvent) {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.photoSelected = reader.result);
      reader.readAsDataURL(this.file);
    }
  }
  fuerzaPasswordlvl1() {
    const value = this.registro.value.Password;
    var filtro1 = '1234567890';
    for (var i = 0; i < value.length; i++) {
      if (filtro1.indexOf(value.charAt(i)) != -1) {
        return true;
      }
    }
    var filtro2 = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
    for (var i = 0; i < value.length; i++) {
      if (filtro2.indexOf(value.charAt(i)) != -1) {
        return true;
      }
    }
    var filtro3 = '@#$%&/()=?¡¿":;.,-_';
    for (var i = 0; i < value.length; i++) {
      if (filtro3.indexOf(value.charAt(i)) != -1) {
        return true;
      }
    }
  }
  fuerzaPasswordlvl2() {
    const value = this.registro.value.Password;
    var filtro3 = '@#$%&/()=?¡¿":;.,-_';
    for (var i = 0; i < value.length; i++) {
      if (filtro3.indexOf(value.charAt(i)) != -1) {
        return true;
      }
    }
    return false;
  }
}
