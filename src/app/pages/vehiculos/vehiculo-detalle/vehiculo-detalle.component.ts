import { Component, Input } from '@angular/core';
import { Vehiculo } from '../../../services/transporte.service';

@Component({
  selector: 'app-vehiculo-detalle',
  templateUrl: './vehiculo-detalle.component.html',
  styleUrl: './vehiculo-detalle.component.scss'
})
export class VehiculoDetalleComponent {
  @Input() vehiculo: Vehiculo | null = null;
  constructor(){
  }

  ngOnInit(): void {
  }
}
