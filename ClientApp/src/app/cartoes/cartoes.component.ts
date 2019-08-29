import { Component, OnInit,Input,ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { NgForm, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CartoesService } from '../service/cartoes.service';

@Component({
  selector: 'app-cartoes',
  templateUrl: './cartoes.component.html',
  styleUrls: ['./cartoes.component.css']
})
export class CartoesComponent implements OnInit {
  title:string="Cartões";
  formulario:FormGroup;
  public lista;
  listData: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['idcartao','descricao','numero','limite','saldo','dtfechamento','dtpagamento','inativo','Operacao'];
  constructor(private service: CartoesService,private snackbar:MatSnackBar, private formBuilder:FormBuilder) { }
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
    this.confFormulario();
    this.reflesh();
  }
  reflesh(){
    debugger;
    this.service.refreshlist().subscribe(
      result => {
       for (let i in result){
         let vl = result[i].inativo;
         let vl2 = result[i].tpcartao;
         if(vl == true){ result[i].inativo = "Sim" }
         if(vl == false){ result[i].inativo = "Não"}
       }
        this.lista = result;
        this.listData = new MatTableDataSource(this.lista);
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
      }, error => { this.erros(error);}
    );
  }
  confFormulario(){
    this.formulario = this.formBuilder.group({
      idcartao:[null],
      descricao:[null,Validators.required],
      numero:["",Validators.compose([Validators.required])],
      inativo:[false],
      limite:[null,Validators.compose([Validators.required])],
      saldo:[null,Validators.required],
      dtfechamento:["",Validators.compose([Validators.min(1),Validators.max(31)])],
      dtpagamento:["",Validators.compose([Validators.min(1),Validators.max(31)])],
    })
  }
  adicionar(){
    debugger;
    if(this.formulario.valid){
      
      if(this.formulario.get('idcartao').value > 0)
      {
        let test = this.formulario.get('idcartao').value
       this.service.update(test,this.formulario.value)
       .subscribe(result =>{
        let msg = "Atualizado com sucesso";
        this.sucesso(msg);
        this.reflesh();
        this.formulario.reset();
       }), error =>{this.erros(error);}
      }
      else{
    this.service.adicionar(this.formulario.value)
    .subscribe(result=>{
      let msg = "Salvo com sucesso";
      this.sucesso(msg);
      this.reflesh();
      this.formulario.reset();
    }), error=>{this.erros(error);}
  }
  }
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
  loadForm(idtpconta, descricao, inativo, tpcartao) {
    if(inativo == "Sim"){inativo = true}
    if(inativo == "Não"){inativo = false}
    this.formulario.get('idcartao').setValue(idtpconta);
    this.formulario.get('descricao').setValue(descricao);
    this.formulario.get('inativo').setValue(inativo);
    this.formulario.get('tpcartao').setValue(tpcartao);
      }
    applyFilter(filterValue: string) {
      this.listData.filter = filterValue.trim().toLowerCase();
    }
}
