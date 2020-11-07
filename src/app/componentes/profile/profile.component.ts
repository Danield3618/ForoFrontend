import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {LoginService} from '../../servicio/login.service'
import {PostsService} from '../../servicio/posts.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  data2:any=[];
  private dataaux:any=[];

  constructor(private loginService:LoginService,private router:Router,private postService:PostsService) { }

  ngOnInit(): void {
    var key=localStorage.getItem("id");
      this.loginService.checkSession(key).subscribe(
        res=>{
          this.dataaux=res;
          this.postService.getPost(this.dataaux.id_usuarios).subscribe(
            res=>{
              this.data2=res
              console.log(this.data2)
            },
            err=> console.log(err)
          )
        },
        err=>{
          localStorage.removeItem("id");
          this.router.navigate(["login"]);
        }
      )
  }

}
