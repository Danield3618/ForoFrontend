import { Component, OnInit } from '@angular/core';

import { LoginService } from '../../servicio/login.service';
import { FriendsService } from '../../servicio/friends.service';
import { PostsService } from '../../servicio/posts.service';
import { Router } from '@angular/router';
import { flatten } from '@angular/compiler';
@Component({
  selector: 'app-list-friends',
  templateUrl: './list-friends.component.html',
  styleUrls: ['./list-friends.component.css'],
})
export class ListFriendsComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private FriendsService: FriendsService,
    private router: Router,
    private postService: PostsService
  ) {}

  data2: any = [];
  amigos: any = [];
  puerto: string = 'http://localhost:3000/static/imagenes/';
  mostrarUsuarios:boolean=false;

  ngOnInit(): void {
    var key = localStorage.getItem('id');
    if (key=='1') {
      this.router.navigate(['login']);
    }
    this.loginService.checkSession(key).subscribe(
      (res) => {
        this.data2 = res;
        this.FriendsService.getFriends(this.data2.IdUsuario).subscribe(
          (res) => {
            this.amigos = res;
          }
        );
      },
      (err) => {
        localStorage.removeItem('id');
        this.router.navigate(['login']);
      }
    );
  }
  chat(apodo:string){

    this.router.navigate(['chat/'+apodo]);
  }
  mostrarUsers(){
    console.log("s")
    this.mostrarUsuarios=!this.mostrarUsuarios;
  }
  
  rechazar(idAmigo: number) {
    this.FriendsService.eliminarAmigo(idAmigo).subscribe(res=>{
      window.location.reload();
    })
  }
  viewProfile(idUserProfile: number) {
    if (idUserProfile == this.data2.IdUsuario) {
      this.router.navigate(['profile']);
    } else {
      this.postService.putUser(idUserProfile);
      this.router.navigate(['userProfile']);
    }
  }
}
