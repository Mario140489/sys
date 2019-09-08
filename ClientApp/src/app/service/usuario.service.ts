import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  rootURL:string;
  constructor(private http:HttpClient, @Inject('BASE_URL')baseUrl:string) {
    this.rootURL= baseUrl;
   }
   listarUsuario(){
     return this.http.get(this.rootURL +'/api/Usuarios').pipe(map(response => response))
   }
   ListarGrupo(){
     return this.http.get(this.rootURL +'/api/GrupoUsuario')
   }
}
