import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable({
  providedIn: 'root'
})
export class GrupoUsuarioService {
  rootURL:string;
  idgrupo = null;
  constructor(private http:HttpClient, @Inject('BASE_URL')baseUrl:string) {
    this.rootURL= baseUrl; 
  }
    ListarGrupousuario(){
      return this.http.get(this.rootURL +'api/GrupoUsuarios').pipe();
    }
    ListarModulos(){
      return  this.http.get(this.rootURL +'api/Modulos/').pipe();
    }
    delete(id){
      return this.http.delete(this.rootURL +'api/GrupoUsuarios/'+ id);
     }
     Grupo(id){
      return this.http.get(this.rootURL + 'api/GrupoUsuarios/'+ id).pipe();
     }
     Adicionar(data){
       return this.http.post(this.rootURL + 'api/GrupoUsuarios',data);
     }
     update(id,data){
       data['idGrupoUsuario'] = id
       return this.http.put(this.rootURL + 'api/GrupoUsuarios/' + id , data);
     }
     ListaModuloAtivo(id){
      return this.http.get(this.rootURL +'api/GrupoXModulos/'+ id).pipe();
     }
}
