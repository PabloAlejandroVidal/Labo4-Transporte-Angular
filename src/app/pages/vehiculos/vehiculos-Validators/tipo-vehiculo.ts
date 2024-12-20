import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isAllowedColor } from '../../../services/transporte.service';

export function tipoVehiculoValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const isValid = isAllowedColor(value);

    return isValid ? null : { tipoVehiculo: true };
  };
}
