import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent} from './componentes/login/login.component'
import {ListarPostComponent} from './componentes/listar-post/listar-post.component'
import {UserCreateComponent} from './componentes/user-create/user-create.component'
import { ProfileComponent } from './componentes/profile/profile.component'

const routes: Routes = [
  {
    path:"",
    redirectTo:"/login",
    pathMatch:"full"
  },
  {
    path:"login",
    component:LoginComponent
  },/*
  {
    path:"login/:id",
    component:LoginComponent
  },*/
  {
    path:"home",
    component:ListarPostComponent
  },
  {
    path:"create",
    component:UserCreateComponent
  },
  {
    path:"profile",
    component:ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
