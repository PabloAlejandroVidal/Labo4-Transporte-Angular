import { Routes } from '@angular/router';
import { noLoguedGuard } from './guards/no-logued.guard';
import { authGuard } from './guards/auth.guard';
import { termsGuard } from './guards/terms.guard';

// Definir el objeto routesNames
export const routesNames = {
  HOME: 'home',
  AUTH: 'auth',
  CHOFERES: 'choferes',
  VEHICULOS: 'vehiculos',
  TERMS: 'aceptar-terminos-condiciones',
} as const;

// Obtener el tipo de las claves de routesNames
type RouteNameKey = keyof typeof routesNames;

// Implementar la función que recibe solo claves de routesNames
export const getRouteName = (r: RouteNameKey): string => {
  return `/${routesNames[r]}`;
};

// Definir el array de rutas
export const routes: Routes = [
  { path: '', redirectTo: routesNames.HOME, pathMatch: 'full' },
  { path: routesNames.HOME, loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent) },
  { path: routesNames.AUTH, loadChildren: () => import('./pages/auth/auth/auth.module').then((m) => m.AuthModule), canActivate: [noLoguedGuard] },
  { path: routesNames.CHOFERES, loadChildren: () => import('./pages/choferes/choferes/choferes.module').then(m => m.ChoferesModule), canActivate: [authGuard] },
  { path: routesNames.VEHICULOS, loadChildren: () => import('./pages/vehiculos/vehiculos/vehiculos.module').then(m => m.VehiculosModule), canActivate: [authGuard] },
  { path: routesNames.TERMS, loadComponent: () => import('./pages/terms/aceptar-terminos/aceptar-terminos.component').then(c=>c.AceptarTerminosComponent), canDeactivate: [termsGuard]},
  { path: '**', redirectTo: routesNames.HOME, pathMatch: 'full' }
];

