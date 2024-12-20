import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { getRouteName } from '../../app.routes';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToggleMenuComponent } from '../toggle-menu/toggle-menu.component';

export interface RoutesForNav {
  name: string,
  path: string,
}

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ToggleMenuComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  @Input() showMenu!: boolean;
  @Input() menuBtnActive!: boolean;

  @Input() showLogout!: boolean;
  @Input({required: true}) routes: RoutesForNav[] = [];

  @Output() logout = new EventEmitter<void>();
  @Output() toggle = new EventEmitter<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ){
  }

  onNavigate = (path: string) => this.router.navigate([path]);

  onLogout () {
    this.logout.emit();
  }

  onToggle() {
    this.toggle.emit();
  }
}
