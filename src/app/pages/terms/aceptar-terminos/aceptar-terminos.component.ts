import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aceptar-terminos',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule],
  templateUrl: './aceptar-terminos.component.html',
  styleUrl: './aceptar-terminos.component.scss'
})
export class AceptarTerminosComponent {
  termsForm!: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.termsForm = this.fb.group({
      edad: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d+$/), // Solo números
          this.rangeValidator(18, 65)
        ]
      ],
      aceptaTerminos: [false, Validators.requiredTrue]
    });
  }

  get edadControl() {
    return this.termsForm.get('edad');
  }

  rangeValidator(min: number, max: number) {
    return (control: { value: number }) => {
      const value = control.value;
      if (value < min || value > max) {
        return { range: true };
      }
      return null;
    };
  }

  canDeactivate(): boolean {
    const values = this.termsForm.value as any;

    // Verificar si el formulario es válido
    if (!values.aceptaTerminos || !values.edad) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, acepta los términos y condiciones y asegúrate de que tu edad sea válida.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return false;
    }

    return true;
  }



  onSubmit(): void {

    if (this.termsForm.valid) {
      this.router.navigate(['/home']);
    }
  }
}
