import { Injectable, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { map } from 'rxjs/operators';

@Injectable()
export class ContasService {
  rootURL: string;
  listData: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    
    this.rootURL = baseUrl;
  }

  adicionar(data) {
    debugger;
    return this.http.post(this.rootURL + 'api/Contas',data);
 
  }
  update(id,data)
  {
    return this.http.put(this.rootURL + 'api/Contas/'+ id, data);

  }
  delete(id) {
    return this.http.delete(this.rootURL + 'api/Contas/' + id);
  }
  refreshList() {
    return this.http.get(this.rootURL + 'api/Contas/GetContas').pipe(map(response => response));
  }
  
  refreshlisttplista(){
    return this.http.get(this.rootURL +'api/TpContas/Gettpcontas').pipe(map(response=> response));
  }
 
}
