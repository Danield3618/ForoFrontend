import { Component, OnInit } from '@angular/core';

import { PostsService} from '../../servicio/posts.service';
import { Post } from 'src/app/modelos/post';

@Component({
  selector: 'app-subir-post',
  templateUrl: './subir-post.component.html',
  styleUrls: ['./subir-post.component.css']
})
export class SubirPostComponent implements OnInit {

  post:any=[];

  constructor(private postService:PostsService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(
      res=>[
        this.post=res
      ],
      err=> console.log(err)
    )
  }

}
