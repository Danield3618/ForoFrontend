import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {ElementRef,ViewChild}from "@angular/core"
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';

import { usuario } from "../../modelos/usuario";

import{UsersService } from '../../servicio/users.service'

interface HtmlInputEvent extends Event{
  target:HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})


export class UserCreateComponent implements OnInit {

  @ViewChild('fotoclick',{static: false}) fotoclick:ElementRef
  file:File;
  photoSelected: string | ArrayBuffer;
  registro: FormGroup;

  errorMessage:boolean=false;

  user:usuario={
    PrimerNombre:'',
    SegundoNombre:'',
    PrimerApellido:'',
    SegundoApellido:'',
    Correo:'',
    Apodo:'',
    Password:'',
    ImagenPerfil:'',
    Celular:0,
    IdTipoPersonaFK:0,
    IdRangoFK:1,
    IdConfiguracionFK:1,
    Descripcion:'',
  }

  constructor(private userService:UsersService, private formBuilder:FormBuilder, private router:Router) { 
    this.registro=this.formBuilder.group({
      PrimerNombre:['',Validators.compose([Validators.required,Validators.maxLength(20)])],
      SegundoNombre:['',Validators.compose([Validators.maxLength(20)])],
      PrimerApellido:['',Validators.compose([Validators.required,Validators.maxLength(20)])],
      SegundoApellido:['',Validators.compose([Validators.maxLength(20)])],
      Correo:['',Validators.compose([Validators.email,Validators.required])],
      Apodo:['',Validators.compose([Validators.required,Validators.maxLength(15)])],
      Password:['',Validators.compose([Validators.required,Validators.minLength(6)])],
      Celular:[''],
      IdTipoPersonaFK:['',Validators.required],
      Descripcion:['']
    });
  }
genero:any=[];
  ngOnInit(): void {
    this.userService.genero().subscribe(
      res=>[
        this.genero=res
      ]
    )
  }

  validate_nick(){
    const val = this.registro.value;
    this.userService.checkNick(val.Apodo).subscribe(
      res=>{
        this.errorMessage=true;
        this.registro.get('Apodo').reset();
        console.log("ya existe");
      },
      err=>{
        this.errorMessage=false;
        
        this.register();
      })
  }
  register(){
      

      //guardar datos
      this.user=this.registro.value;
      this.user.IdRangoFK=1;
      this.user.IdConfiguracionFK=1
      this.user.Password=CryptoJS.SHA3(this.user.Password,{ outputLength: 256 }).toString();

      //guardar imgaen
      const imagen = this.fotoclick.nativeElement.files[0];
      if(this.fotoclick.nativeElement.files[0]){
        imagen.fieldname=this.user.Apodo+imagen.fieldname;
        console.log(imagen.fieldname);
        this.file=imagen;
        console.log(this.file);
        this.userService.profile_image(this.file).subscribe(res =>{ 
          console.log("done")})
        this.user.ImagenPerfil='http://localhost:3000/static/imagenes/'+this.file.name
      }else{
        this.user.ImagenPerfil='http://localhost:3000/static/imagenes/profile.png'
      }
      //utiliza el servicio
      this.userService.register_user(this.user).subscribe(
      res=>{
        this.router.navigate(['login']);
      },
      err=>{
      })
  }
  fotoPreview(event: HtmlInputEvent){
    if(event.target.files && event.target.files[0]){
      this.file=event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.photoSelected =reader.result;
      reader.readAsDataURL(this.file);
    }
  }
}
