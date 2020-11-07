import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {LoginService} from '../../servicio/login.service'
import {PostsService} from '../../servicio/posts.service'

@Component({
  selector: 'app-listar-post',
  templateUrl: './listar-post.component.html',
  styleUrls: ['./listar-post.component.css']
})
export class ListarPostComponent implements OnInit {

  constructor(private loginService:LoginService,private router:Router,private postService:PostsService) { }
  post:any=[];

  ngOnInit(): void {
    var key=localStorage.getItem("id");
      this.loginService.checkSession(key).subscribe(
        res=>{
          this.postService.getPosts().subscribe(
            res=>[
              this.post=res
            ],
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
