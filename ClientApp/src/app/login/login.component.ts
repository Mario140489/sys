import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder,Validator} from '@angular/forms';
import {MaisNavComponent} from '../mais-nav/mais-nav.component';
import {LoginService} from '../service/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formulario:FormGroup;
   
  constructor(private formBuider:FormBuilder, private maisnav:MaisNavComponent,
     private service: LoginService) { }

  ngOnInit() {
    this.confFormulario();
  }
  login(){
    debugger;
    const login = this.formulario.get('user').value;
    const pws =  this.formulario.get('pws').value;
    let usu;
    this.service.Login(this.formulario.value)
    .subscribe(result =>{
      usu = result;
    })
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
