
import { Injectable ,Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import {UsuarioService} from '../service/usuario.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PageEvent } from '@angular/material';
@Injectable()
@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {
  public lista;
  listData: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  // MatPaginator Output
  pageEvent: PageEvent;
  displayedColumns: string[] = ['idUsuario', 'nome','Operaçao'];
  constructor(private service:UsuarioService) { }

  ngOnInit() {
    this.CarregarUsuario();
  }
  CarregarUsuario(){
  this.service.listarUsuario().subscribe(result =>{
    this.lista =result;
    this.listData = new MatTableDataSource(this.lista);
    this.listData.paginator = this.paginator;
  })
  }
  applyFilter(filterValue: string) {
    this.listData.filter = filterValue.trim().toLowerCase();
  }
}
