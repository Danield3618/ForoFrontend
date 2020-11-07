import { Component, OnInit } from '@angular/core';

import { LoginService } from '../../servicio/login.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  data:any=[];

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    var key=localStorage.getItem("id");
    this.loginService.checkSession(key).subscribe(
      res=>[
        this.data=res
      ]
    )
  }
}
