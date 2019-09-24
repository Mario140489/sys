import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder,Validator} from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import {MaisNavComponent} from '../mais-nav/mais-nav.component';
import {LoginService} from '../service/login.service'
import {Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formulario:FormGroup;
  constructor(private formBuider:FormBuilder, private maisnav:MaisNavComponent,
     private service: LoginService,private snackbar:MatSnackBar, private router:Router) { }
     erros(msg){
      this.snackbar.open("Error "+ msg, "", {
        duration: 3000, panelClass: ['error'], verticalPosition: 'top', horizontalPosition: 'right'
      });
    }
  ngOnInit() {
    this.confFormulario();
  }
  login(){
    const login = this.formulario.get('user').value;
    const pws =  this.formulario.get('pws').value;
    let usu;

    this.maisnav.boleano = false;
    this.service.Login(this.formulario.value)
    .subscribe(result =>{
      usu = result;
      if (usu.length > 0){
      let id = usu[0].id_GrupoUsuario
      this.pegarmudulos(id,usu);
      }
      else{
        let  msg:string = "Usuario não encontrado";
        this.erros(msg);
        this.maisnav.boleano = true;
      }
    }, error => {this.erros(error);
      this.maisnav.boleano = true;
    });
    
    }
    pegarmudulos(id,usu){
      let modulos
      this.service.modules(id).subscribe(
        resultado =>{
          modulos = resultado
          this.maisnav.modules = modulos;
          this.maisnav.user = usu[0];
          this.router.navigate(['home']);
          this.maisnav.boleano = true;
        }
      )
    }
    confFormulario(){
     this.formulario =this.formBuider.group({
       user:[""],
       pws:[""]
     })
    }

}
