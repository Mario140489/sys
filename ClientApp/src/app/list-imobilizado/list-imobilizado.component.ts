import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { ImobilizadoService } from '../service/imobilizado.service';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-list-imobilizado',
  templateUrl: './list-imobilizado.component.html',
  styleUrls: ['./list-imobilizado.component.css']
})
export class ListImobilizadoComponent implements OnInit {
  title = 'Controle Patrimonial';
  hidden = true;
  disabled = false;
  panelOpenState = false;
  formulario: FormGroup;
  public lista;
  listData: MatTableDataSource<any>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['id_imobilizado', 'ds_localizacao', 'nr_nf',
    'ds_fornecedor', 'dt_aquisicao', 'Operacao']
  constructor(private service: ImobilizadoService, private snackbar: MatSnackBar, private formBuilder: FormBuilder) { }
  sucesso(msg) {
    this.snackbar.open(msg, '', {
      duration: 3000, panelClass: ['salvocomsucesso'], verticalPosition: 'top', horizontalPosition: 'right'
    });
  }
  erros(msg) {
    this.snackbar.open(msg, '', {
      duration: 3000, panelClass: ['error'], verticalPosition: 'top', horizontalPosition: 'right'
    });
  }
  ngOnInit() {
    this.confFormulario();
    this.reflesh();
  }
  soma_alt() {
    this.formulario.get('nr_vldepreciavel').
      setValue(this.formulario.get('nr_vlaquisicao').
        value - this.formulario.get('nr_vlrecuperavel').value);
  }
  soma_fiscal() {
    const vl = Date.parse(this.formulario.get('dt_fiscal').value);
    const cl2 = Date.parse(this.formulario.get('dt_aquisicao').value);
    const diaemmil = 1000 * 60 * 60 * 24;
    const dt = vl - cl2;
    const diferenca = (dt / diaemmil) / 30;
    const dataatual: any = new Date;
    dataatual.getDate();
    this.formulario.get('nr_taxa_fiscal_anual').setValue(100 / this.formulario.get('nr_vida_util').value);
    this.formulario.get('nr_taxa_fiscal_mensal').setValue(this.formulario.get('nr_taxa_fiscal_anual').value / 12);

    if (100 / this.formulario.get('nr_taxa_fiscal_anual').value * 12 -
      diferenca < 0) {
      this.formulario.get('ds_status_fiscal').setValue('Depreciado');
    }
    else {
      this.formulario.get('ds_status_fiscal').setValue('A Depreciar');
    }
    if (this.formulario.get('ds_status_fiscal').value === 'A Depreciar') {
      const valor = this.formulario.get('nr_vldepreciavel').
      value / (100 / this.formulario.get('nr_taxa_fiscal_anual').value * 12) * diferenca;
      this.formulario.get('nr_depre_acumu_fiscal').setValue(valor);
      this.formulario.get('nr_depre_mensal_fiscal').
      setValue(this.formulario.get('nr_vldepreciavel').
      value / (100 / this.formulario.get('nr_taxa_fiscal_anual').value * 12))
    }
    else {
      this.formulario.get('nr_depre_acumu_fiscal').setValue(this.formulario.get('nr_vldepreciavel').value);
      this.formulario.get('nr_depre_mensal_fiscal').setValue(0);
    }


  }
  soma_reavaliacao() {
    this.formulario.get('nr_vlrecu_reavaliado').
    setValue(this.formulario.get('nr_vlreavaliado').value * 0.1);
    this.formulario.get('nr_vldepre_reavaliado').
    setValue(this.formulario.get('nr_vlreavaliado').
    value - this.formulario.get('nr_vlrecu_reavaliado').value);
  }
  calculo_contaxa() {
    const vl = Date.parse(this.formulario.get('dt_fiscal').value);
    const cl2 = Date.parse(this.formulario.get('dt_reavaliacao').value);
    const diaemmil = 1000 * 60 * 60 * 24;
    const dt = vl - cl2;
    let diferenca = (dt / diaemmil);
    diferenca = diferenca / 30;
    this.formulario.get('nr_taxa_societaria_anual').setValue(100 / this.formulario.get('nr_vida_util_societaria').value);
    this.formulario.get('nr_taxa_societaria_mensal').setValue(this.formulario.get('nr_taxa_societaria_anual').value / 12);
    if (100 / this.formulario.get('nr_taxa_societaria_anual').value * 12 -
      diferenca < 0) {
      this.formulario.get('do_statussocietaria').setValue('Depreciado');
    }
    else {
      this.formulario.get('do_statussocietaria').setValue('A Depreciar');
    }
    if (this.formulario.get('do_statussocietaria').value === 'A Depreciar') {

      const valor = this.formulario.get('nr_vldepre_reavaliado').
      value / (100 / this.formulario.get('nr_taxa_societaria_anual').value * 12) * diferenca;
      this.formulario.get('nr_depreacumu_societaria').
      setValue(valor + this.formulario.get('nr_depreacuinicial').value);
      this.formulario.get('nr_depremensal_societaria').
      setValue(this.formulario.get('nr_vldepre_reavaliado').
      value / (100 / this.formulario.get('nr_taxa_societaria_anual').value * 12))
    }
    else {
      this.formulario.get('nr_depreacumu_societaria').setValue(this.formulario.get('nr_vlreavaliado').value);
      this.formulario.get('nr_depremensal_societaria').setValue(0);
    }
  }
  confFormulario() {
    const dataatual = new Date;
    let dt = dataatual.toLocaleDateString();
    dt = this.formdate(dt);
    this.formulario = this.formBuilder.group({
      id_imobilizado: [''],
      //id_produtogroup: [''],
      ds_localizacao: [''],
      ds_fornecedor: [''],
      dt_aquisicao: [''],
      nr_nf: [''],
      ds_registro: [''],
      ds_item: [''],
      /*ds_detalhe: [''],
      ds_material: [''],
      ds_cor: [''],
      id_status: [false],
      nr_vlaquisicao: [''],
      nr_vlrecuperavel: [''],
      nr_vldepreciavel: [''],
      nr_vida_util: [''],
      nr_taxa_fiscal_anual: [''],
      nr_taxa_fiscal_mensal: [''],
      ds_status_fiscal: [''],
      nr_depre_acumu_fiscal: [''],
      nr_depre_mensal_fiscal: [''],
      dt_fiscal: [''],
      bol_imagem: [''],
      do_inativo: [false],
      do_imobilizado: [false],
      nr_vlreavaliado: [''],
      nr_vlrecu_reavaliado: [''],
      nr_vldepre_reavaliado: [''],
      nr_vida_util_societaria: [''],
      nr_taxa_societaria_anual: [''],
      nr_taxa_societaria_mensal: [''],
      do_statussocietaria: [''],
      nr_depreacuinicial: [''],
      nr_depreacumu_societaria: [''],
      nr_depremensal_societaria: [''],
      dt_reavaliacao: [null]*/
    });
    this.formulario.controls['nr_vldepreciavel'].disable();
    this.formulario.controls['nr_taxa_fiscal_anual'].disable();
    this.formulario.controls['nr_taxa_fiscal_mensal'].disable();
    this.formulario.controls['ds_status_fiscal'].disable();
    this.formulario.controls['nr_depre_acumu_fiscal'].disable();
    this.formulario.controls['nr_depre_mensal_fiscal'].disable();
    this.formulario.controls['nr_vlrecu_reavaliado'].disable();
    this.formulario.controls['nr_vldepre_reavaliado'].disable();
    this.formulario.controls['nr_taxa_societaria_anual'].disable();
    this.formulario.controls['nr_taxa_societaria_mensal'].disable();
    this.formulario.controls['do_statussocietaria'].disable();
    this.formulario.controls['nr_depreacumu_societaria'].disable();
    this.formulario.controls['nr_depremensal_societaria'].disable();
    this.formulario.get('dt_fiscal').setValue(dt);
  }
  scroll(id) {
    const div = document.getElementById(id.id);
    div.scrollIntoView();
  }
  adicionar() {
    debugger;
    if (this.formulario.valid) {
      if (this.formulario.get('id_imobilizado').value > 0) {
        const id = this.formulario.get('id_imobilizado').value
          .subscribe(result => {
            const msg = 'Atualizado com sucesso';
            this.sucesso(msg);
            this.reflesh();
            this.formulario.reset();
          });
      }
      else {
        this.service.adicionar(this.formulario.value)
          .subscribe(result => {
            const msg = 'Salvo com sucesso';
            this.sucesso(msg);
            this.reflesh();
            this.formulario.reset();
          });
      }
    }
  }
  delete(id) {
    try {
      if (id == null || id < 0) {
        const msg = 'Id não pode ser nulo ou 0';
        this.erros(msg);
      }
      else {
        this.service.delete(id).subscribe(
          result => {
            const msg = 'Deletado com sucesso';
            this.sucesso(msg);
            this.reflesh();
          });
      }
    }
    finally {
      this.reflesh();
    }
  }
  formdate(data) {

    const dt = data.split('/');
    const dt2 = dt[2] + '-' + dt[1] + '-' + dt[0];
    return dt2
  }
  reflesh() {
    debugger;
    this.service.refreshlist().subscribe(
      result => {
        this.lista = result;
        this.listData = new MatTableDataSource(this.lista);
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
      }, error => { this.erros(error); }
    );
  }
}
