import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthData, AuthMessage, UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { catchError, of, Subscription, take } from 'rxjs';
import { authDataInit } from '../../../interfaces/auth-data';
import { showError, showSuccess } from '../../../utils/swalAlert';
import { routesNames } from '../../../app.routes';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {


  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  subscriptions: Subscription[] = [];
  authData: AuthData = authDataInit;
  msgResult: string = '';
  form!: FormGroup;


  async ngOnInit(){
    this.form = new FormGroup({
      email: new FormControl("", [Validators.minLength(8), Validators.email, Validators.required]),
      clave: new FormControl("", [Validators.minLength(6), Validators.required]),
    });
  }

  setMessage(message: string) {
    this.msgResult = message;
  }

  async onSubmit() {

    // Verificación de si el formulario es válido
    if (!this.form.valid) {
      const authMessage = {
        code: '¡Error en el formulario!',
        message: 'Verifica los datos ingresados e intenta nuevamente',
      };

      this.setMessage(authMessage.message);
      showError(authMessage);
      return;
    }

    // Intentamos realizar el registro
    try {
      const {email = '', clave = ''} = {...this.form.value};
      // Llamada al servicio de registro, usando from para convertirlo en un Observable
      const subscription = this.userService.registrarUsuario({}, email, clave, 'usuario').pipe(
        take(1),
        catchError((error) => {
          // Manejo de error si la llamada al servicio falla
          const authMessage: AuthMessage = {
            code: 'Error inesperado',
            message: 'Un error inesperado ha ocurrido, intentalo nuevamente o comunicate con el proveedor de servicios',
          };
          this.setMessage(authMessage.code);
          showError(authMessage);
          // Retorna un observable vacío para evitar que el flujo continúe con errores
          return of(null);
        })
      ).subscribe({
        next: (authResult) => {
          // Manejo de resultados cuando el registro es exitoso
          if (authResult && authResult.success) {
            // Aquí, puedes comprobar si el register fue exitoso o redirigir a otra página
            showSuccess({
              code: 'Registro exitoso',
              message: 'Te has registrado exitosamente',
            });
            if ( authResult.user ) {
              this.router.navigateByUrl(routesNames.TERMS);
            }
          } else {
            // En caso de error, muestra el mensaje correspondiente
            const authMessage = authResult?.result || {
              code: '¡Error en el Registro de usuario!',
              message: 'Hubo un problema registrar el usuario, intenta nuevamente más tarde.',
            };
            this.setMessage(authMessage.message);
            showError(authMessage);
          }
        },
        error: (err) => {
          // Manejo de errores globales que podrían surgir en la suscripción
          const authMessage = {
            code: 'Error inesperado',
            message: 'Un error inesperado ha ocurrido. Intenta nuevamente más tarde.',
          };
          this.setMessage(authMessage.message);
          showError(authMessage);
        },
      });
      this.subscriptions.push(subscription);
    } catch (error) {
      // Manejo de errores inesperados fuera de la llamada al servicio
      const authMessage: AuthMessage = {
        code: 'Error inesperado',
        message: 'Un error inesperado ha ocurrido, intentalo nuevamente o comunicate con el proveedor de servicios',
      };
      this.setMessage(authMessage.message);
      showError(authMessage);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription)=>{
      subscription.unsubscribe();
    })
  }
}
