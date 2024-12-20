import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaChoferesComponent } from '../lista-choferes/lista-choferes.component';
import { AltaChoferComponent } from '../alta-chofer/alta-chofer.component';
import { ChoferesLayoutComponent } from '../choferes-layout/choferes-layout.component';

const routes: Routes = [
  { path: '', component: ChoferesLayoutComponent,
    children: [
      { path: '', redirectTo: 'lista-choferes', pathMatch: 'full'},
      { path: 'lista-choferes', component: ListaChoferesComponent },
      { path: 'alta-chofer', component: AltaChoferComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChoferesRoutingModule { }
