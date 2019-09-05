import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Router } from '@angular/router';
import {LoginService} from  '../service/login.service';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatSnackBarConfig } from '@angular/material';

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
  submodules = null;
  index =0;
  form = [];
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
  CarregaModules(id){
          this.service.SubModulos(id).subscribe(result =>{
            this.submodules = result;
            if (this.submodules.length > 0){
              for(var i =0 ; i < this.submodules.length; i++)
              {
                this.service.pegarformularios(this.submodules[i].id_SubModulos).subscribe(
                  resultado =>{
                  this.form.push(resultado);
                  this.navlateral = true;
                  this.btnhidden = false;
                  }
                )
              }
          
            }
            else{
              let msg:string = "Nenhum Modulo ativo para seu Usuario";
              this.erros(msg);
            }
          }, error =>{this.erros(error)});
          
  }
  mostrarform(id){
    if(this.index === id)
    {
      this.index =0
    }
    else{
   this.index = id;
    }
  }
}
