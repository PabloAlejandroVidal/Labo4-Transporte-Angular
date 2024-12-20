import { Component } from '@angular/core';
import { RoutesForNav } from '../../../components/nav-bar/nav-bar.component';
import { routesNames } from '../../../app.routes';

@Component({
  selector: 'app-choferes-layout',
  templateUrl: './choferes-layout.component.html',
  styleUrl: './choferes-layout.component.scss'
})
export class ChoferesLayoutComponent {
  routesForNav: RoutesForNav[] = [
    {name:'Home', path: routesNames.HOME},
    {name:'Login', path: routesNames.AUTH},
  ]

}
