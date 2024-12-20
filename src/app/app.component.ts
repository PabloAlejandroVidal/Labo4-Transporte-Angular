import { Component, Input } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { RoutesForNav, NavBarComponent } from './components/nav-bar/nav-bar.component';
import { routesNames } from './app.routes';
import { UserService } from './services/user.service';
import { take } from 'rxjs';
import { showError, showSuccess } from './utils/swalAlert';
import { SideBarComponent } from './components/side-bar/side-bar.component';

const routesForNotLoguedUser: RoutesForNav[] = [
  {name:'Home', path: routesNames.HOME},
  {name:'Login', path: routesNames.AUTH + '/' + 'login'},
  {name:'Registro', path: routesNames.AUTH + '/' + 'register'},
]
const routesForUser: RoutesForNav[] = [
  {name:'Home', path: routesNames.HOME},
  {name:'Choferes', path: routesNames.CHOFERES},
]
const routesForAdmin: RoutesForNav[] = [
  {name:'Home', path: routesNames.HOME},
  {name:'Choferes', path: routesNames.CHOFERES},
  {name:'Vehículos', path: routesNames.VEHICULOS},
]


const routesSideForNotLoguedUser: RoutesForNav[] = [
  {name:'Home', path: routesNames.HOME},
  {name:'Login', path: routesNames.AUTH + '/' + 'login'},
  {name:'Registro', path: routesNames.AUTH + '/' + 'register'},
]
const routesSideForUser: RoutesForNav[] = [
  {name:'Lista Choferes', path: routesNames.CHOFERES + '/' + 'lista-choferes'},
  {name:'Alta Chofer', path: routesNames.CHOFERES + '/' + 'alta-chofer'},
]
const routesSideForAdmin: RoutesForNav[] = [
  {name:'Lista Choferes', path: routesNames.CHOFERES + '/' + 'lista-choferes'},
  {name:'Alta Chofer', path: routesNames.CHOFERES + '/' + 'alta-chofer'},
  {name:'Lista Vehículos', path: routesNames.VEHICULOS + '/' + 'lista-vehiculos'},
  {name:'Alta Vehículo', path: routesNames.VEHICULOS + '/' + 'alta-vehiculo'},
]

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, SideBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  @Input() showSideMenu: boolean = false;
  showLogout: boolean = false;

  public routes: RoutesForNav[] = routesForNotLoguedUser;
  public routesSide: RoutesForNav[] = routesSideForNotLoguedUser;

  isOnAuthRoute = false;

  title = 'parcial';

  ngOnInit(): void {
    this.userService.observeCurrentUser().subscribe((usuario)=>{
      if (usuario){
        this.showLogout = true;
        if (usuario.rol === 'admin') {
          this.routes = routesForAdmin;
          this.routesSide = routesSideForAdmin;
        }
        if (usuario.rol === 'usuario') {
          this.routes = routesForUser;
          this.routesSide = routesSideForUser;
        }
      }else{
        this.routes = routesForNotLoguedUser;
        this.routesSide = routesSideForNotLoguedUser;
        this.showLogout = false;
      }
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isOnAuthRoute = event.urlAfterRedirects.includes(routesNames.AUTH);
      }
    });
  }

  onMenuClicked() {
    this.showSideMenu = !this.showSideMenu;
  }

  onLogout() {
    this.userService.logOutUser().pipe(
      take(1),
    ).subscribe((result)=>{
      this.router.navigateByUrl('auth')
      if(result.success){
        showSuccess(result.result);
      }else{
        showError(result.result);
      }
    });
  }
}
