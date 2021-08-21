import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './componentes/login/login.component';
import { ListarPostComponent } from './componentes/listar-post/listar-post.component';
import { UserCreateComponent } from './componentes/user-create/user-create.component';
import { ProfileComponent } from './componentes/profile/profile.component';
import { GeneralProfileComponent } from './componentes/general-profile/general-profile.component';
import { SubirPostComponent } from './componentes/subir-post/subir-post.component';
import { EditarPostComponent } from './componentes/editar-post/editar-post.component';
import { ListFriendsComponent } from './componentes/list-friends/list-friends.component';
import { FriendControlComponent } from './componentes/friend-control/friend-control.component';
import { ResultadosComponent } from './componentes/resultados/resultados.component';
import { ChatComponent } from './componentes/chat/chat.component';
import { chainedInstruction } from '@angular/compiler/src/render3/view/util';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  } /*
  {
    path:"login/:id",
    component:LoginComponent
  },*/,
  {
    path: 'home',
    component: ListarPostComponent,
  },
  {
    path: 'create',
    component: UserCreateComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'userProfile',
    component: GeneralProfileComponent,
  },
  {
    path: 'uploadPost',
    component: SubirPostComponent,
  },
  {
    path: 'editPost',
    component: EditarPostComponent,
  },
  {
    path: 'friends',
    component: ListFriendsComponent,
  },
  {
    path: 'resultados/:search',
    component: ResultadosComponent,
  },
  {
    path: 'chat/:apodo',
    component: ChatComponent,
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
