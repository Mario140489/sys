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
      this.maisnav.user = usu[0].nome;
      this.maisnav.navlateral = true;
      this.maisnav.btnhidden = false;
      this.maisnav.boleano = true;
      this.router.navigate(['home']);
      }
      else{
        this.maisnav.boleano = true;
      let  msg:string = "Usuario não encontrado";
        this.erros(msg);
      }
    }, error => this.erros(error));
    /*if(login == 'teste' && pws == '123456')
    {
      let doc =  document.getElementById('user');
      doc.innerText = "José Mario vieira";
     // let menulateral = document.getElementById('menulateral');
     // menulateral.hidden=false;
     this.maisnav.navlateral = true;
      let btnmenu = document.getElementById('btn-menu');
      btnmenu.hidden=false;
    }
    else{
  alert('teste');
    }*/
    }
    confFormulario(){
     this.formulario =this.formBuider.group({
       user:[""],
       pws:[""]
     })
    }

}
