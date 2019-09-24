import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MaisNavComponent } from '../mais-nav/mais-nav.component';
import { MatSnackBar } from '@angular/material';
import { GrupoUsuarioService } from '../service/grupo-usuario.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-grupo-usuario',
  templateUrl: './grupo-usuario.component.html',
  styleUrls: ['./grupo-usuario.component.css']
})
export class GrupoUsuarioComponent implements OnInit {
  menu ="";
  nomemodulo ="";
  form ="";
  buscar = "Buscar";
  GrupoUsuario =null;
  formulario:FormGroup;
  senha ="";
  idgrupo = null;
  done:any =[];
  todo:any =[];
  constructor(private formBuider:FormBuilder,private router:Router,
    private maisnav:MaisNavComponent, private snackbar:MatSnackBar,
    private service:GrupoUsuarioService) { 
      this.confiform();
      this.idgrupo = this.service.idgrupo;
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
 async ngOnInit() {
    this.buscar = this.maisnav.buscar;
    this.menu =this.maisnav.menu
    this.nomemodulo =this.maisnav.nomemodulo;
    this.form =this.maisnav.formnome;
   await this.carregaModulos();
   if(this.idgrupo > 0){
     this.maisnav.boleano = false;
     await this.CarregarGrupo(this.idgrupo);
   }
  }
  async CarregarGrupo(id){
     const usuario = await this.service.Grupo(id).toPromise();
     this.buscar= usuario['nome'];
     this.formulario.get('idGrupoUsuario').setValue(usuario['idGrupoUsuario']);
     this.formulario.get('ds_GrupoUsuario').setValue(usuario['ds_GrupoUsuario']);
     this.formulario.get('Inativo').setValue(usuario['inativo']);
     this.maisnav.boleano = true;
   }
  confiform(){
    this.formulario = this.formBuider.group({
      idGrupoUsuario:'',
      ds_GrupoUsuario:'',
      Inativo:[false],
    })
    this.formulario.controls['idGrupoUsuario'].disable();
  }
  Adicionar(){
    this.maisnav.boleano = false;
  if(this.formulario.valid){
    if(this.formulario.get('idGrupoUsuario').value > 0){
      this.service.update( this.formulario.get('IdUsuario').value , this.formulario.value)
      .subscribe(result =>{
        let msg ="Salvo com sucesso;";
        this.sucesso(msg);
        this.formulario.reset();
        this.maisnav.boleano = true;
        this.router.navigate(['ListarGrupoUsuario']);
      }, error =>{this.erros(JSON.stringify(error)); this.maisnav.boleano = true})
    }
  else{
    this.service.Adicionar(this.formulario.value)
    .subscribe(result =>{
      let msg ="Salvo com sucesso.";
      this.sucesso(msg);
      this.maisnav.boleano = true;
      this.router.navigate(['ListarGrupoUsuario']);
    }, error =>{this.erros(JSON.stringify(error)); this.maisnav.boleano = true})
  }
  }
}
  async carregaModulos(){
   this.done = await this.service.ListarModulos().toPromise();
   this.maisnav.boleano = true;
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
