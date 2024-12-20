import { Component, Input } from '@angular/core';
import { Chofer } from '../../../services/transporte.service';

@Component({
  selector: 'app-chofer-detalle',
  templateUrl: './chofer-detalle.component.html',
  styleUrl: './chofer-detalle.component.scss'
})
export class ChoferDetalleComponent {
  @Input() chofer: Chofer | null = null;
  constructor(){
  }

  ngOnInit(): void {
  }
}
