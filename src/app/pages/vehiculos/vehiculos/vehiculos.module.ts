import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiculosRoutingModule } from './vehiculos-routing.module';
import { RouterModule, RouterOutlet } from '@angular/router';
import { VehiculosLayoutComponent } from '../vehiculos-layout/vehiculos-layout.component';
import { VehiculoAltaComponent } from '../vehiculo-alta/vehiculo-alta.component';
import { VehiculosListaComponent } from '../vehiculos-lista/vehiculos-lista.component';
import { VehiculoDetalleComponent } from '../vehiculo-detalle/vehiculo-detalle.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TipoVehiculoPipe } from '../pipes/tipo-vehiculo.pipe';
import { VehiculoBajaComponent } from '../vehiculo-baja/vehiculo-baja.component';
import { VehiculoModificacionComponent } from '../vehiculo-modificacion/vehiculo-modificacion.component';
import { VehiculoAltaNuevoComponent } from '../vehiculo-alta-nuevo/vehiculo-alta-nuevo.component';
import { ColoredRowDirective } from '../directives/colored-row.directive';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    VehiculosLayoutComponent,
    VehiculoAltaComponent,
    VehiculosListaComponent,
    VehiculoDetalleComponent,
    VehiculoModificacionComponent,
    VehiculoBajaComponent,
    VehiculoAltaNuevoComponent,
    ColoredRowDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    VehiculosRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    TipoVehiculoPipe,
    MatButtonModule
  ]
})
export class VehiculosModule { }
