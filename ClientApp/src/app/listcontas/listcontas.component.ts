import { Injectable ,Component, OnInit,ViewChild } from '@angular/core';
import { ContasService } from '../service/contas.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PageEvent } from '@angular/material';
@Injectable()
@Component({
  selector: 'app-listcontas',
  templateUrl: './listcontas.component.html',
  styleUrls: ['./listcontas.component.css']
})

export class ListcontasComponent implements OnInit {
  public list: conta[];
  public lista;
  listData: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // MatPaginator Output
  pageEvent: PageEvent;
  constructor(private service: ContasService) {

  }

  ngOnInit() {

    this.reflesh();
  }
  reflesh() {
    this.service.refreshList()
      .subscribe(result => {
        this.lista = result;
        this.listData = new MatTableDataSource(this.lista);
        this.listData.paginator = this.paginator;
      });
  }
  displayedColumns: string[] = ['idContas', 'decricao', 'valor', 'vencimento', 'Operaçao'];
  delete(id) {
    try {
      if (id == null || id < 0) {
        alert("Id não pode ser nulo ou 0")
      }
      else {
        this.service.delete(id).subscribe(result => {
          alert("Deletado com sucesso");
          this.reflesh();
        });
      }
    }
    finally {
      this.reflesh();
    }
    
    
  }



}


interface conta {
  idContas: number;
  decricao: string;
  valor: number;
  vencimento;
}
