import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  rootURL:string;
  Usuario = {
    "IdUsuario":null,
    "Nome":"",
    "Login":"",
    "Senha":"",
    "Id_GrupoUsuario":"",
    "Inativo":1
  }
  constructor(private http:HttpClient, @Inject('BASE_URL')baseUrl:string) {
    this.rootURL= baseUrl;
   }
   listarUsuario(){
     return this.http.get(this.rootURL +'api/Usuarios').pipe(map(response => response))
   }
   ListarGrupo(){
     return this.http.get(this.rootURL +'api/GrupoUsuarios').pipe();
   }
   Adicionar(data){
     debugger;
     this.Usuario.Nome = data.Nome;
     this.Usuario.Login = data.Login;
     this.Usuario.Senha = data.Senha;
     this.Usuario.Id_GrupoUsuario = data.Grupo;
    // this.Usuario.Inativo = data.Inativo;
     if(data.Inativo == true) {this.Usuario.Inativo = 1} else{this.Usuario.Inativo = 0}
     data = this.Usuario;
     return this.http.post(this.rootURL +'api/Usuarios/adicionar',data);
   }
}
