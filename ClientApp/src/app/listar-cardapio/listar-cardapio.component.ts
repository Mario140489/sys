import { Injectable ,Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import {ProdCardapioService} from '../service/prod-cardapio.service';
import { PageEvent } from '@angular/material';
import {MaisNavComponent} from '../mais-nav/mais-nav.component';
import {UsuarioComponent} from '../usuario/usuario.component'
import {Router } from '@angular/router';

@Component({
  selector: 'app-listar-cardapio',
  templateUrl: './listar-cardapio.component.html',
  styleUrls: ['./listar-cardapio.component.css']
})
export class ListarCardapioComponent implements OnInit {
  [x: string]: any;
  menu ="";
  nomemodulo ="";
  form ="";
  buscar = "Buscar";
  public lista;
  listData: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  pageEvent: PageEvent;
  displayedColumns: string[] = ['idprodcardapio', 'nome','preco','inativo','Operaçao'];
  constructor(private service:ProdCardapioService, private maisnav:MaisNavComponent,
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
      async ngOnInit() {
        await this.Carregarprdocardapio();
        this.menu = this.maisnav.menu;
        this.nomemodulo = this.maisnav.nomemodulo;
        this.form = this.maisnav.formnome;
  }
  async Carregarprdocardapio(){
    debugger;
    this.service.ListarProdCardapio().subscribe(async result =>{
     this.lista = result;
     this.listData = new MatTableDataSource(this.lista);

  })
  }
  applyFilter(filterValue: string) {
    if(filterValue == ""){
      this.listData = new MatTableDataSource();
    }
    else{
    this.listData = new MatTableDataSource(this.lista);
    this.listData.paginator = this.paginator;
    this.listData.filter = filterValue.trim().toLowerCase();
    }
  }
  new(){
    //this.service.IdUsuario = "";
    this.maisnav.buscar = "Novo";
    this.router.navigate(['Cardapio']);
  }
  Alterar(id){
    //this.service.IdUsuario = id;
    this.router.navigate(['Cardapio'])
  }
  async delete(id) {
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
