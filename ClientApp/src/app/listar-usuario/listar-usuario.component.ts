
import { Injectable ,Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import {UsuarioService} from '../service/usuario.service';
import { PageEvent } from '@angular/material';
import {MaisNavComponent} from '../mais-nav/mais-nav.component';
import {UsuarioComponent} from '../usuario/usuario.component'
import {Router } from '@angular/router';
@Injectable()
@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {
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
  constructor(private service:UsuarioService, private maisnav:MaisNavComponent,
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
    this.CarregarUsuario();
    this.menu = this.maisnav.menu;
    this.nomemodulo = this.maisnav.nomemodulo;
    this.form = this.maisnav.formnome;
  }
 async CarregarUsuario(){
    this.service.listarUsuario().subscribe(result =>{
    this.lista =result;
    this.listData = new MatTableDataSource(this.lista);
    this.listData.paginator = this.paginator;
  })
  }
  applyFilter(filterValue: string) {
    this.listData.filter = filterValue.trim().toLowerCase();
  }
  new(){
    this.maisnav.buscar = "Novo";
    this.router.navigate(['Usuario']);
  }
  async delete(id) {
    debugger;
      if (id == null || id < 0) {
        
      }
      else {
       this.service.delete(id).subscribe(async (result) => {
          let msg = "Deletado com sucesso";
          await this.CarregarUsuario();
          this.sucesso(msg);
        }, error => { this.erros(error); });
      }
  }
}
