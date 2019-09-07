import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import {Router } from '@angular/router';
import {LoginService} from  '../service/login.service';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { exists } from 'fs';
import { async } from 'q';

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
  itens= [];
  index =0;
  form =null;
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
 async CarregaModules(id){
          this.service.SubModulos(id).subscribe(result =>{
            this.submodules = result;
            this.form = this.submodules;
            if (this.submodules.length > 0){
              for(var i =0 ; i < this.submodules.length ;i++ ){
                let id = this.submodules[i].id_SubModulos;
                if(id > 0){
                var teste =  this.mergeitens(id)
                }
              }
            }
            else{
              let msg:string = "Nenhum Modulo ativo para seu Usuario";
              this.erros(msg);
            }
          }, error =>{this.erros(error)}
          );
          
          
  }
     async  mergeitens(id){
      this.service.pegarformularios(id).subscribe(
      result =>{
        if(result == [])
        {
        }
        else{
        this.form = result;
        this.navlateral = true;
        this.btnhidden = false;
        }
      }
    );
  
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
