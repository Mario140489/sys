import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
rootURL:string;
  constructor(private http:HttpClient, @Inject('BASE_URL')baseUrl:string) {
    this.rootURL= baseUrl;
   }
   adicionar(data){
     debugger;
   data = {
     "ds_status": data.ds_status,
     "do_inativo": data.do_inativo
   }
    return this.http.post(this.rootURL + 'api/Crm_status/',data);
  }
  update(id,data){
    return this.http.put(this.rootURL + 'api/Crm_status/'+id,data );     
  }
  delete(id){
    return this.http.delete(this.rootURL +'api/Crm_status/'+ id);
  }
  refreshlist(){
    return this.http.get(this.rootURL +'api/Crm_status/getstatus').pipe(map(response=> response));
  }
}
