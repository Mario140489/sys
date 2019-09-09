import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder,Validator, Validators, FormControl} from '@angular/forms';
import {MaisNavComponent} from '../mais-nav/mais-nav.component';
import {UsuarioService} from '../service/usuario.service';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  menu ="";
  nomemodulo ="";
  form ="";
  buscar = "Buscar";
  GrupoUsuario =null;
  formulario:FormGroup;
  senha ="";
  constructor(private formBuider:FormBuilder,private maisnav:MaisNavComponent, private usario:UsuarioService) { }

  ngOnInit() {
    this.menu =this.maisnav.menu
    this.nomemodulo =this.maisnav.nomemodulo;
    this.form =this.maisnav.formnome;
    this.buscar = this.maisnav.buscar;
    this.confiform();
    this.carregargrupo();
  }
  confiform(){
    this.formulario = this.formBuider.group({
      Nome:[""],
      Login:[""],
      Senha:[""],
      Grupo:[""],
      ConfSenha:[""],
      Inativo:[false]
    })
  }
  async carregargrupo(){
    this.GrupoUsuario = await this.usario.ListarGrupo().toPromise();
  }
  verifsenha(){
   return (this.formulario.get('ConfSenha').value ? this.formulario.get('Senha').value : {required:true})
  }
}
