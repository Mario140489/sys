
import { Injectable ,Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import {UsuarioService} from '../service/usuario.service';
import { PageEvent } from '@angular/material';
import {MaisNavComponent} from '../mais-nav/mais-nav.component';
@Injectable()
@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {
  menu ="";
  nomemodulo ="";
  form ="";
  buscar = "Buscar";
  public lista;
  listData: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  // MatPaginator Output
  pageEvent: PageEvent;
  displayedColumns: string[] = ['idUsuario', 'nome','Operaçao'];
  constructor(private service:UsuarioService, private maisnav:MaisNavComponent) { }

  ngOnInit() {
    this.CarregarUsuario();
    this.menu = this.maisnav.menu;
    this.nomemodulo = this.maisnav.nomemodulo;
    this.form = this.maisnav.formnome;
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
