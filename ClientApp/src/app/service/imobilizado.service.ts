import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImobilizadoService {
rootURL: string;
  constructor(private http: HttpClient, @Inject('BASE_URL')baseUrl: string) {
    this.rootURL = baseUrl;
   }
   adicionar(data){
     delete data['id_imobilizado'];
    return this.http.post(this.rootURL + 'api/Crm_imobilizado/', data);
   }
  refreshlist(){
    debugger;
    return this.http.get(this.rootURL + 'api/Crm_imobilizado/getimobilizado').pipe(map(response => response));
  }
  update( id, data){
    return this.http.put(this.rootURL + 'api/Crm_imobilizado/' + id, data);
  }
  delete(id){
    return this.http.delete(this.rootURL + 'api/Crm_imobilizado/' + id);
  }
}
