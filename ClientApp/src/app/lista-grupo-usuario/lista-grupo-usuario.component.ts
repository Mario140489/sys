import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, PageEvent, MatSnackBar } from '@angular/material';
import { MaisNavComponent } from '../mais-nav/mais-nav.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-grupo-usuario',
  templateUrl: './lista-grupo-usuario.component.html',
  styleUrls: ['./lista-grupo-usuario.component.css']
})
export class ListaGrupoUsuarioComponent implements OnInit {
  [x: string]: any;
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
  displayedColumns: string[] = ['idUsuario', 'nome','inativo','Operaçao'];
  constructor(private maisnav:MaisNavComponent,
    private router:Router,private snackbar:MatSnackBar) { }
    sucesso(msg) {
      this.snackbar.open(msg, "", {
        duration: 3000, panelClass: ['salvocomsucesso'], verticalPosition: 'top', horizontalPosition: 'right'
      });
      }
      erros(msg){
        this.snackbar.open("Error"+ msg, "", {
          duration: 3000, panelClass: ['error'], verticalPosition: 'top', horizontalPosition: 'right'
        });
      }
  ngOnInit() {
  }

}
