import { Component, Input } from '@angular/core';
import { Country } from '../../../services/country.service';

@Component({
  selector: 'app-pais-detalle',
  templateUrl: './pais-detalle.component.html',
  styleUrl: './pais-detalle.component.scss'
})
export class PaisDetalleComponent {
  @Input() country: Country | null = null;

}
