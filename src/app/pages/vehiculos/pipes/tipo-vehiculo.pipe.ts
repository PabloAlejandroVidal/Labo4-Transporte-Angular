import { Pipe, PipeTransform } from '@angular/core';
import { Vehiculo } from '../../../services/transporte.service';

@Pipe({
  name: 'tipoVehiculo',
  standalone: true
})
export class TipoVehiculoPipe implements PipeTransform {

  transform(vehiculo: Vehiculo): string {
    switch(vehiculo.tipo){
      case 'terrestre':{
        return "Terrestre";
      };
      case 'aereo': {
        return "Aéreo";
      };
      case 'maritimo': {
        return "Marítimo";
      }
    }
  }

}
