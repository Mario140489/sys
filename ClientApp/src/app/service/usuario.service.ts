import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  rootURL:string;
  Usuario = {
    "Nome":"",
    "Login":"",
    "Senha":"",
    "Id_GrupoUsuario":"",
    "Inativo":false
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
     this.Usuario.Nome = data.Nome;
     this.Usuario.Login = data.Login;
     this.Usuario.Senha = data.Senha;
     this.Usuario.Id_GrupoUsuario = data.Grupo;
     this.Usuario.Inativo = data.Inativo;
     data = this.Usuario;
     return this.http.post(this.rootURL +'api/Usuarios/adicionar',data);
   }
   delete(id){
    return this.http.delete(this.rootURL +'api/Usuarios/'+ id)
   }
   update(data){
      return this.http.put(this.rootURL + 'api/Usuarios',data)
    }

}
