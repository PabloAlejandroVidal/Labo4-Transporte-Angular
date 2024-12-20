import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiculosListaComponent } from '../vehiculos-lista/vehiculos-lista.component';
import { VehiculoAltaComponent } from '../vehiculo-alta/vehiculo-alta.component';
import { VehiculosLayoutComponent } from '../vehiculos-layout/vehiculos-layout.component';

const routes: Routes = [
  { path: '', component: VehiculosLayoutComponent,
    children: [
      { path: '', redirectTo: 'lista-vehiculos', pathMatch: 'full'},
      { path: 'lista-vehiculos', component: VehiculosListaComponent },
      { path: 'alta-vehiculo', component: VehiculoAltaComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiculosRoutingModule { }
