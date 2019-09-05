import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  rootURL:string;
  constructor(private http:HttpClient, @Inject('BASE_URL')baseUrl:string) {
    this.rootURL= baseUrl;
   }
   Login(data){
     data ={
       "Login":data.user,
       "Senha":data.pws,
     }
    return this.http.post(this.rootURL + 'api/Usuarios/Login',data);
   }
   modules(id){
     return this.http.get(this.rootURL + 'api/Modulos/' + id);
   }
   SubModulos(id){
     return this.http.get(this.rootURL + 'api/SubModulos/' + id)
   }
   pegarformularios(id){
     return this.http.get(this.rootURL + 'api/Formularios/' +id )
   }
}
