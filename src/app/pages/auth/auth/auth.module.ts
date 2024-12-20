import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthLayoutComponent } from '../auth-layout/auth-layout.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';



@NgModule({
  declarations: [
    AuthLayoutComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
  ],
  exports: [
  ]
})
export class AuthModule { }
