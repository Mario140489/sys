import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Router } from '@angular/router';
import {LoginService} from  '../service/login.service';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { async } from '@angular/core/testing';


@Component({
  selector: 'mais-nav',
  templateUrl: './mais-nav.component.html',
  styleUrls: ['./mais-nav.component.css']
})
export class MaisNavComponent {
  user:string = "";
  navlateral =false;
  btnhidden = true;
  boleano = true;
  modules = null;
  nomemodulo ="";
  submodules = null;
  index =0;
  form = 0;
  menu ="";
  icon ="";
  formnome =""
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,private router:Router, private service:LoginService,private snackbar:MatSnackBar) {}

  erros(msg){
    this.snackbar.open("Error "+ msg, "", {
      duration: 3000, panelClass: ['error'], verticalPosition: 'top', horizontalPosition: 'right'
    });
  }
  ngOnInit() {
   this.router.navigate(['Login']);
  }
 async CarregaModules(id,nome,icon){
          this.service.SubModulos(id).subscribe(async result =>{
            this.submodules = result;
            if (this.submodules.length > 0){
              this.form = this.submodules;
              await this.pegarform();
              this.icon=icon;
              this.menu = nome;
              this.btnhidden = false;
              this.navlateral = true;
            }
            else{
              this.icon="";
              this.menu = "";
              this.btnhidden = true;
              this.navlateral = false;
              let msg:string = "Nenhum Modulo ativo para seu Usuario";
              this.erros(msg);
            }
          }, error =>{
            this.icon="";
              this.menu = "";
              this.btnhidden = true;
              this.navlateral = false;
            this.erros(error)});
  }
 async pegarform(){
   debugger;
     for(var i =0 ; i < this.submodules.length; i++)
    {
     this.submodules[i].formularios =  await  this.service.pegarformularios(this.submodules[i].id_SubModulos).toPromise();
     this.submodules[i] ;
    }

  }
  mostrarsubmodulos(id,nome){
    if(this.index === id)
    {
      this.index =0
    }
    else{
   this.index = id;
   this.nomemodulo = nome;
    }

  }
  mostrarformativo(id,link,nome){
    debugger;
   this.form = id;
   this.formnome=nome;
   this.router.navigate([link]);
  }
}
