import { Component, OnInit, Input, ViewChild, Output } from '@angular/core';
import { NgForm, FormGroup} from '@angular/forms'; 
import { ContasService } from '../service/contas.service';
import { contas } from '../service/contas.model';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import * as $ from "jquery";
import { split } from 'ts-node';
import { error } from '@angular/compiler/src/util';
@Component({
  selector: 'app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.css']
})


export class ContasComponent implements OnInit {
  title: string = "Conta";
  contasForm: contas;
  public lista;
  public tpconta;
  @Input() cleardata: boolean = false;
  @Input() objconta: contas = new contas();
  listData: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['idContas', 'decricao', 'valor', 'vencimento', 'parcela','Operacao'];

  constructor(private service: ContasService, private snackbar: MatSnackBar) {

  }
  
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
    this.objconta.parcela = '1';
    this.reflesh();
    this.refreshlisttplista();
  }
  reflesh() {
    this.service.refreshList().subscribe
      (result => {
        this.lista = result;
        this.listData = new MatTableDataSource(this.lista);
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
      }, error => { this.erros(error);});
    }
  refreshlisttplista(){
    this.service.refreshlisttplista().subscribe
    (
      result =>{
        this.tpconta = result;
      },error =>{this.erros(error);}
    );
  }
    
  applyFilter(filterValue: string) {
    this.listData.filter = filterValue.trim().toLowerCase();
  }
  delete(id) {
    try {
      if (id == null || id < 0) {
        alert("Id não pode ser nulo ou 0")
      }
      else {
        this.service.delete(id).subscribe(result => {
          let msg = "Deletado com sucesso"
          this.sucesso(msg);
          this.reflesh();
        }, error => { this.erros(error); });
      }
    }
    finally {
      this.reflesh();
    }


  }

  salvar(regForm: NgForm) {
    debugger;
    this.contasForm = new contas();
    if(regForm.valid){
      if (regForm.value.idContas>0)
      {
        this.contasForm.idContas = regForm.value.idContas;
        this.contasForm.descricao = regForm.value.descricao;
        this.contasForm.parcela = regForm.value.parcela;
        this.contasForm.valor = regForm.value.valor;
        this.contasForm.vencimento = regForm.value.vencimento;
        this.service.update(regForm.value.idContas,this.contasForm).subscribe(
          result =>{
            let msg = "Atualizado com sucesso";
            this.sucesso(msg);
            this.reflesh();
            regForm.resetForm();
          }, error => { this.erros(error); }
        )
      }
    else  {
    this.contasForm.descricao = regForm.value.descricao;
    this.contasForm.parcela = regForm.value.parcela;
    this.contasForm.valor = regForm.value.valor;
    this.contasForm.vencimento = regForm.value.vencimento;
        this.service.adicionar(this.contasForm).subscribe(result => {
          let msg = "Salvo com sucesso";
          this.sucesso(msg);
      this.reflesh();
          regForm.resetForm();
        }, error => this.erros(error));
      }
    
  }
  }

  loadForm(idContas, descricao, valor, parcela ,vencimento) {
this.objconta.idContas = idContas
this.objconta.descricao = descricao
this.objconta.valor = valor
this.objconta.parcela = parcela.toString()
this.objconta.vencimento = formdate(vencimento)
}
}


function formdate(data){
  var dt = data.split('T')
  return dt[0]
}
function pegarid(){
  var id = $('#id').val();
  return id
}
function pegarvalur()
{
  return $('#parcela').val();
}