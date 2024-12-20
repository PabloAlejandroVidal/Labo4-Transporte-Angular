import { CanDeactivateFn } from '@angular/router';
import { AceptarTerminosComponent } from '../pages/terms/aceptar-terminos/aceptar-terminos.component';

export const termsGuard: CanDeactivateFn<AceptarTerminosComponent> = (component: AceptarTerminosComponent) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};
