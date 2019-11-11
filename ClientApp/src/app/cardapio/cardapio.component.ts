import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder,Validator, Validators, FormControl, FormGroupDirective} from '@angular/forms';
import {MaisNavComponent} from '../mais-nav/mais-nav.component';
import {UsuarioService} from '../service/usuario.service';
import { ErrorStateMatcher, MatSnackBar } from '@angular/material';
import {Router } from '@angular/router';
import { async } from '@angular/core/testing';
import {ProdCardapioService} from '../service/prod-cardapio.service'
@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.css']
})
export class CardapioComponent implements OnInit {
  menu ="";
  nomemodulo ="";
  form ="";
  buscar = "Buscar";
  formulario:FormGroup;
  idprodcardapio =null;
  constructor(private formBuider:FormBuilder,private router:Router,
    private maisnav:MaisNavComponent,private snackbar:MatSnackBar,private service:ProdCardapioService) { 
      this.confiform();
      this.idprodcardapio = this.service.idprodcardapio;
    }

  ngOnInit() {
    this.buscar = this.maisnav.buscar;
    this.menu =this.maisnav.menu
    this.nomemodulo =this.maisnav.nomemodulo;
    this.form =this.maisnav.formnome;
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
    confiform(){
      this.formulario = this.formBuider.group({
        idprodcardapio:'',
        nome:'',
        preco:'',
        inativo:false
      })
      
      this.formulario.controls['idprodcardapio'].disable();
    }
}
