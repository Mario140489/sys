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
  }
  confiform(){
    this.formulario = this.formBuider.group({
      idGrupoUsuario:'',
      ds_GrupoUsuario:'',
      Inativo:[false],
    })
    this.formulario.controls['idGrupoUsuario'].disable();
  }
  async carregaModulos(){debugger;
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
