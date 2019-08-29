import { Component, OnInit,Input,ViewChild } from '@angular/core';
import { TpcontasService } from '../service/tpcontas.service';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { NgForm, FormGroup, FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-tpcontas',
  templateUrl: './tpcontas.component.html',
  styleUrls: ['./tpcontas.component.css']
})
export class TpcontasComponent implements OnInit {
 title:string="Tipo de conta";
 formulario:FormGroup;
 public lista;
 listData: MatTableDataSource<any>;
 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;
 displayedColumns: string[] = ['idtpconta','descricao','inativo','tpcartao','Operacao'];
 constructor(private service: TpcontasService,private snackbar:MatSnackBar, private formBuilder:FormBuilder) { }
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
         if(vl2 == true){ result[i].tpcartao = "Sim" }
         if(vl2 == false){ result[i].tpcartao = "Não"}
       }
        this.lista = result;
        this.listData = new MatTableDataSource(this.lista);
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
      }, error => { this.erros(error);}
    );
  }
confFormulario(){
  debugger;
     this.formulario = this.formBuilder.group({
       idtpconta:[""],
       descricao:["",Validators.required],
       inativo:[false],
       tpcartao:[false],
     });
}
adicionar(){
  debugger;
  if(this.formulario.valid){
    if(this.formulario.get('idtpconta').value > 0)
    {
      let test = this.formulario.get('idtpconta').value
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
if(tpcartao == "Sim"){tpcartao = true}
if(tpcartao == "Não"){tpcartao = false}
this.formulario.get('idtpconta').setValue(idtpconta);
this.formulario.get('descricao').setValue(descricao);
this.formulario.get('inativo').setValue(inativo);
this.formulario.get('tpcartao').setValue(tpcartao);
  }
applyFilter(filterValue: string) {
  this.listData.filter = filterValue.trim().toLowerCase();
}
}
