import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProdutogroupService {
  rootURL:string;
  constructor(private http:HttpClient, @Inject('BASE_URL')baseUrl:string) {
    this.rootURL = baseUrl
   }
   dicionar(data){
    data = {
      "ds_produtogroup": data.ds_produtogroup,
      "do_inativo": data.do_inativo
    }
     return this.http.post(this.rootURL + 'api/Crm_produtogroup/',data);
   }
   update(id,data){
     return this.http.put(this.rootURL + 'api/Crm_produtogroup/'+id,data );     
   }
   delete(id){
     return this.http.delete(this.rootURL +'api/Crm_produtogroup/'+ id);
   }
   refreshlist(){
     return this.http.get(this.rootURL +'api/Crm_produtogroup/getprodutogroup').pipe(map(response=> response));
   }
}
