import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './componentes/nav/nav.component';
import { SubirPostComponent } from './componentes/subir-post/subir-post.component';
import { ListarPostComponent } from './componentes/listar-post/listar-post.component';
import { FriendControlComponent } from './componentes/friend-control/friend-control.component';
import { ListFriendsComponent } from './componentes/list-friends/list-friends.component';
import { LoginComponent } from './componentes/login/login.component';
import {PostsService} from './servicio/posts.service'
import {LoginService} from './servicio/login.service';
import { UserCreateComponent } from './componentes/user-create/user-create.component';
import { ProfileComponent } from './componentes/profile/profile.component';
import { EditarPostComponent } from './componentes/editar-post/editar-post.component';
import { ComentarioComponent } from './componentes/comentario/comentario.component';
import { GeneralProfileComponent } from './componentes/general-profile/general-profile.component';
import { ResultadosComponent } from './componentes/resultados/resultados.component';
import { ChatComponent } from './componentes/chat/chat.component'

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SubirPostComponent,
    ListarPostComponent,
    FriendControlComponent,
    ListFriendsComponent,
    LoginComponent,
    UserCreateComponent,
    ProfileComponent,
    EditarPostComponent,
    ComentarioComponent,
    GeneralProfileComponent,
    ResultadosComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    PostsService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
