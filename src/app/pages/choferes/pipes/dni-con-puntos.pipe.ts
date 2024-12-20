import { Pipe, PipeTransform } from '@angular/core';
import { Chofer } from '../../../services/transporte.service';

@Pipe({
  name: 'dniConPuntos',
})
export class DniConPuntosPipe implements PipeTransform {

  transform(usuario: Chofer): string {
    const number = parseFloat(usuario.dni);

    if (isNaN(number)) {
      return usuario.dni;
    }

    // Formatear el número con puntos como separador de miles
    return new Intl.NumberFormat('es-ES').format(number);
  }
}
