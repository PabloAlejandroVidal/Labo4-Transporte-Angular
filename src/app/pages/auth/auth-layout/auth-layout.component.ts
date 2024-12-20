import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesForNav } from '../../../components/nav-bar/nav-bar.component';
import { routesNames } from '../../../app.routes';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {
  private router: Router = inject(Router);

  routesForNav: RoutesForNav[] = [
    {name:'Home', path: routesNames.HOME},
    {name:'Login', path: routesNames.AUTH},
  ]

  goLogin = () => this.router.navigate(['/auth/login']);
  goRegister = () => this.router.navigate(['/auth/register']);

  isLoginRouteActive(): boolean {
    return this.router.isActive('auth/login', {
      matrixParams: "exact",
      queryParams: "exact",
      paths: "exact",
      fragment: 'exact'

    });
  }
  isRegisterRouteActive(): boolean {
    return this.router.isActive('auth/register', {
      matrixParams: "exact",
      queryParams: "exact",
      paths: "exact",
      fragment: 'exact'
    });
  }


}
