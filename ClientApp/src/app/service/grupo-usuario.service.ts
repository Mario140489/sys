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
      return this.http.get(this.rootURL +'api/Modulos/').pipe();
    }
}
