import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartoesService {
  rootURL:string;
  constructor(private http:HttpClient, @Inject('BASE_URL')baseUrl:string) {
    this.rootURL= baseUrl;
   }
  adicionar(data){
    debugger;
   data = {
     "descricao":data.descricao,
     "numero":data.numero,
     "limite":data.limite,
     "saldo":data.saldo,
     "dtfechamento":data.dtfechamento,
     "dtpagamento":data.dtpagamento,
     "inativo":data.inativo
   }
    return this.http.post(this.rootURL + 'api/CartaoCreditoes/',data);
  }
  update(id,data){
    return this.http.put(this.rootURL + 'api/CartaoCreditoes/'+id,data );     
  }
  delete(id){
    return this.http.delete(this.rootURL +'api/CartaoCreditoes/'+ id);
  }
  refreshlist(){
    return this.http.get(this.rootURL +'api/CartaoCreditoes/getcartao').pipe(map(response=> response));
  }
}
