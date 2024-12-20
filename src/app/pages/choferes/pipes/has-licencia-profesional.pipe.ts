import { Pipe, PipeTransform } from '@angular/core';
import { Chofer } from '../../../services/transporte.service';

@Pipe({
  name: 'hasLicenciaProfesional',
})
export class HasLicenciaProfesionalPipe implements PipeTransform {

  transform(usuario: Chofer): string {
    if (usuario.licencia){
      return 'Si';
    }
    else{
      return 'No';
    }
  }
}
