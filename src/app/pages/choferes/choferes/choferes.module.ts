import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChoferesRoutingModule } from './choferes-routing.module';
import { AltaChoferComponent } from '../alta-chofer/alta-chofer.component';
import { ListaChoferesComponent } from '../lista-choferes/lista-choferes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectorPaisComponent } from '../../../components/selector-pais/selector-pais.component';
import { RouterModule } from '@angular/router';
import { ChoferesLayoutComponent } from '../choferes-layout/choferes-layout.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChoferDetalleComponent } from '../chofer-detalle/chofer-detalle.component';
import { PaisDetalleComponent } from '../pais-detalle/pais-detalle.component';
import { NavBarComponent } from '../../../components/nav-bar/nav-bar.component';
import { FiltroPorNombrePipe } from '../pipes/filtro-por-nombre.pipe';
import { HasLicenciaProfesionalPipe } from '../pipes/has-licencia-profesional.pipe';
import { DniConPuntosPipe } from '../pipes/dni-con-puntos.pipe';
import { ColoredRowDirective } from '../../vehiculos/directives/colored-row.directive';
import { MatButtonModule } from '@angular/material/button';
import { StopPropagationDirective } from '../../../directives/stop-propagation.directive';


@NgModule({
  declarations: [
    AltaChoferComponent,
    ListaChoferesComponent,
    ChoferesLayoutComponent,
    ChoferDetalleComponent,
    PaisDetalleComponent,
    HasLicenciaProfesionalPipe,
    DniConPuntosPipe,
    FiltroPorNombrePipe,
    StopPropagationDirective,

  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ChoferesRoutingModule,
    ReactiveFormsModule,
    SelectorPaisComponent,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    NavBarComponent,
    MatButtonModule
  ],
  exports: [
    SelectorPaisComponent,
    NavBarComponent
  ]
})
export class ChoferesModule { }
