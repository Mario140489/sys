import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import {ProdutogroupService} from '../service/produtogroup.service';
@Component({
  selector: 'app-produtogroup',
  templateUrl: './produtogroup.component.html',
  styleUrls: ['./produtogroup.component.css']
})
export class ProdutogroupComponent implements OnInit {
title:string ="Grupo de produto";
formulario: FormGroup;
public lista;
listData: MatTableDataSource<any>;
@ViewChild(MatPaginator) paginator:MatPaginator;
@ViewChild(MatSort) sort:MatSort;
displayedColumns: string[] =['id_produtogroup','ds_produtogroup','do_inativo','Operacao']
  constructor(private service: ProdutogroupService, private snackbar:MatSnackBar,private formBuilder:FormBuilder) {
    this.formulario = this.formBuilder.group({
      id_produtogroup:[null],
      ds_produtogroup:[null,Validators.required],
      do_inativo:[false],
    })
   }
   sucesso(msg){
    this.snackbar.open(msg,"",{
      duration: 3000,panelClass:['salvocomsucesso'], verticalPosition:'top',horizontalPosition:'right'
    });
  }
  erros(msg){
    this.snackbar.open(msg,"",{
      duration:3000, panelClass:['error'], verticalPosition:'top', horizontalPosition:'right'
    });
  }
  ngOnInit() {
    this.reflesh();
  }
  reflesh(){
    debugger;
    this.service.refreshlist().subscribe(
      result => {
        for (let i in result){
          let vl = result[i].do_inativo;
          if(vl == true){ result[i].do_inativo = "Sim"}
          if(vl == false){ result[i].do_inativo = "Não"}
        }
        this.lista = result;
        this.listData = new MatTableDataSource(this.lista);
        this.listData.paginator=this.paginator;
        this.listData.sort = this.sort;
      }, error => {this.erros(error);}
    );
  }
  confFormulario(){
    this.formulario = this.formBuilder.group({
      id_produtogroup:[null],
      ds_produtogroup:[null,Validators.required],
      do_inativo:[false],
    })
  }
  adicionar(){
    if (this.formulario.valid){
      if(this.formulario.get('id_produtogroup').value > 0)
      {
        this.service.update(this.formulario.get('id_produtogroup').value,this.formulario.value)
        .subscribe(result =>{
          let msg = "Atualizado com sucesso";
          this.sucesso(msg);
          this.reflesh();
          this.formulario.reset();
        }), error => {this.erros(error);}
      }
      else{
        this.service.dicionar(this.formulario.value)
        .subscribe(result => {
          let msg = "Salvo com sucesso";
          this.sucesso(msg);
          this.reflesh();
          this.formulario.reset();
          this.confFormulario();
        }), error => {this.erros(error);}
      }
    }
  }
  delete(id){
    try{
       if(id == null|| id < 0 ){
         alert("Id não pode ser nulo ou 0")
       }
       else{
         this.service.delete(id).subscribe(result => {
           let msg = "Deletado com sucesso";
           this.sucesso(msg);
           this.reflesh();
         }, error => {this.erros(error);});
       } 
    }
    finally{
      this.reflesh();
    }
  }
  loadForm(id_produtogroup,ds_produtogroup,do_inativo){
    if(do_inativo == "Sim"){do_inativo = true}
    if(do_inativo == "Não"){do_inativo = false}
    this.formulario.get('id_produtogroup').setValue(id_produtogroup);
    this.formulario.get('ds_produtogroup').setValue(ds_produtogroup);
    this.formulario.get('do_inativo').setValue(do_inativo);
  }
  applyfilter(filterValue: string){
    this.listData.filter = filterValue.trim().toLowerCase();
  }
}
