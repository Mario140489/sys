import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TpcontasService {
rootURL:string;

  constructor(private http:HttpClient, @Inject('BASE_URL')baseUrl:string) {
    this.rootURL= baseUrl;
   }
   adicionar(data){
     debugger;
     data = {
      "descricao":data.descricao,
      "inativo": data.inativo,
      "tpcartao": data.tpcartao
    }
     return this.http.post(this.rootURL + 'api/TpContas/',data);
   }
   update(id,data){
     return this.http.put(this.rootURL + 'api/TpContas/'+id,data );     
   }
   delete(id){
     return this.http.delete(this.rootURL +'api/TpContas/'+ id);
   }
   refreshlist(){
     return this.http.get(this.rootURL +'api/TpContas/Gettpcontas').pipe(map(response=> response));
   }
}
