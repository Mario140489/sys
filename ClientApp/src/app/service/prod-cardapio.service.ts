import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable({
  providedIn: 'root'
})
export class ProdCardapioService {
  rootURL:string;
  idprodcardapio = null;
  constructor(private http:HttpClient, @Inject('BASE_URL')baseUrl:string) {
    this.rootURL= baseUrl; 
  }
  delete(id){
    return this.http.delete(this.rootURL +'api/GrupoUsuarios/'+ id);
   }
   Adicionar(data){
     return this.http.post(this.rootURL + 'api/ProdCardapios',data);
   }
   update(id,data){
     data['idGrupoUsuario'] = id
     return this.http.put(this.rootURL + 'api/GrupoUsuarios/' + id , data);
   }
   ListarProdCardapio(){
    return this.http.get(this.rootURL +'api/ProdCardapios').pipe();
   }
}
