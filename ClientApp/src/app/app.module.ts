import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { TableBasicExample } from './listacontas/listaContas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import {MatCheckboxModule,
  MatTreeModule,
  MatSelectModule,MatRadioModule,
  MatPaginatorModule, MatTooltipModule,
  MatNativeDateModule, MatSortModule,
  MatToolbarModule, MatButtonModule,
  MatSidenavModule, MatIconModule,
  MatGridListModule, MatListModule,
  MatCardModule, MatExpansionModule,
  MatInputModule, MatFormFieldModule
  
} from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgxCurrencyModule } from "ngx-currency"
import { MaisNavComponent } from './mais-nav/mais-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ContasComponent } from './contas/contas.component';
import { ListcontasComponent } from './listcontas/listcontas.component';
import { ContasService } from './service/contas.service';
import { CartoesService } from './service/cartoes.service';
import { TpcontasService } from './service/tpcontas.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import br from '@angular/common/locales/br';
import {NgxMaskModule} from 'ngx-mask-2'
import { USE_VALUE } from '@angular/core/src/di/injector';
import { TpcontasComponent } from './tpcontas/tpcontas.component';
import { CartoesComponent } from './cartoes/cartoes.component';
import { StatusComponent } from './status/status.component';
import { ProdutogroupComponent } from './produtogroup/produtogroup.component';
import { ListImobilizadoComponent } from './list-imobilizado/list-imobilizado.component';
registerLocaleData(br, 'pt-BR');
//import $ from "JQuery";
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    TableBasicExample,
    MaisNavComponent,
    ContasComponent,
    ListcontasComponent,
    TpcontasComponent,
    CartoesComponent,
    StatusComponent,
    ProdutogroupComponent,
    ListImobilizadoComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'listacontas', component: TableBasicExample },
      { path: 'Status', component: StatusComponent },
      { path: 'Cartoes', component:CartoesComponent},
      { path: 'tp_contas', component:TpcontasComponent},
      { path: 'Grupo', component:ProdutogroupComponent},
      { path: 'imobilizado',component:ListImobilizadoComponent}
    ]),
    NgxMaskModule.forRoot(),
    MatTreeModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatGridListModule,
    MatIconModule,
    MatSelectModule,
    LayoutModule,
    MatListModule,
    MatCardModule,
    MatExpansionModule,
    AngularFontAwesomeModule,
    MatInputModule,
    MatFormFieldModule,
    NgxCurrencyModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatRadioModule,
    MaterialFileInputModule,
  ],
  providers: [ContasService, TpcontasService,CartoesService, MatDatepickerModule, ListcontasComponent,
    { provide: LOCALE_ID, useValue: "pt-br" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
