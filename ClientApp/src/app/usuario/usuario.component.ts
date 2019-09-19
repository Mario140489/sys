import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder,Validator, Validators, FormControl, FormGroupDirective} from '@angular/forms';
import {MaisNavComponent} from '../mais-nav/mais-nav.component';
import {UsuarioService} from '../service/usuario.service';
import { ErrorStateMatcher, MatSnackBar } from '@angular/material';
import {Router } from '@angular/router';
class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})

export class UsuarioComponent implements OnInit {
  errorMatcher = new CrossFieldErrorMatcher();
  menu ="";
  nomemodulo ="";
  form ="";
  buscar = "Buscar";
  GrupoUsuario =null;
  formulario:FormGroup;
  senha ="";
  constructor(private formBuider:FormBuilder,private router:Router,
    private maisnav:MaisNavComponent, private snackbar:MatSnackBar,private usario:UsuarioService) { 
    this.confiform();
    //this.initForm();
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
  ngOnInit() {
    this.menu =this.maisnav.menu
    this.nomemodulo =this.maisnav.nomemodulo;
    this.form =this.maisnav.formnome;
    this.buscar = this.maisnav.buscar;
    this.carregargrupo();
  }
  confiform(){
    this.formulario = this.formBuider.group({
      IdUsuario:'',
      Nome:'',
      Login:'',
      Senha:'',
      Grupo:'',
      Inativo:[false],
      verifyPassword: ''
    }, {
      validator: this.passwordValidator
    })
    this.formulario.controls['IdUsuario'].disable();
  }
  async carregargrupo(){
    this.GrupoUsuario = await this.usario.ListarGrupo().toPromise();
  }
  initForm() {
    this.formulario = this.formBuider.group({
      username: '',
      password: ['',Validators.minLength(6)],
      verifyPassword: ''
    }, {
      validator: this.passwordValidator
    })
  }
  passwordValidator(form: FormGroup) {
    const condition = form.get('Senha').value !== form.get('verifyPassword').value;

    return condition ? { passwordsDoNotMatch: true} : null;
  }
  Adicionar(){
    debugger;
      this.maisnav.boleano = false;
    if(this.formulario.valid){
      if(this.formulario.get('IdUsuario').value > 0){
        this.usario.update(this.formulario.value)
        .subscribe(result =>{
          let msg ="Salvo com sucesso;";
          this.sucesso(msg);
          this.formulario.reset();
          this.maisnav.boleano = true;
        }, error =>{this.erros(JSON.stringify(error)); this.maisnav.boleano = true})
      }
    else{
      this.usario.Adicionar(this.formulario.value)
      .subscribe(result =>{
        let msg ="Salvo com sucesso.";
        this.sucesso(msg);
        this.maisnav.boleano = true;
        this.router.navigate(['ListarUsuario']);
      }, error =>{this.erros(JSON.stringify(error)); this.maisnav.boleano = true})
    }
    }
  }
  remove(id){
    this.usario.delete(id)
    .subscribe(result =>{
      let msg = "Deletado com sucesso.";
      this.sucesso(msg);
      this.maisnav.boleano = true;
    }, error =>{this.erros(JSON.stringify(error))})
  }
 /* passwordValidator(form: FormGroup) {
    const condition = form.get('Senha').value !== form.get('verifyPassword').value;
    return condition ? { passwordsDoNotMatch: true} : null;
  }*/
}