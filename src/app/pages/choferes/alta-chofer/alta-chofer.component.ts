import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { lettersOnlyValidator } from '../../../validators/lettersOnlyValidator';
import { numbersOnlyValidator } from '../../../validators/numbersOnlyValidator';
import Swal from 'sweetalert2';
import { TransporteService } from '../../../services/transporte.service';
import { FirestoreService } from '../../../services/firestore.service';
import { continentsNames } from '../../../components/selector-pais/continentsNames';

@Component({
  selector: 'app-alta-chofer',
  templateUrl: './alta-chofer.component.html',
  styleUrl: './alta-chofer.component.scss'
})
export class AltaChoferComponent {

  msgResult: string = '';
  message: any = true;
  form!: FormGroup;
  filtroContinentes: string[] = []

  transporteService: TransporteService = inject(TransporteService);


  async ngOnInit(){
    this.form = new FormGroup({
      nombre: new FormControl("", [lettersOnlyValidator(), Validators.required]),
      dni: new FormControl("", [numbersOnlyValidator(), Validators.minLength(8), Validators.maxLength(8), Validators.required]),
      edad: new FormControl("", [numbersOnlyValidator(), Validators.min(18), Validators.max(50), Validators.required]),
      nroLicencia: new FormControl("", [numbersOnlyValidator(), Validators.minLength(7), Validators.required]),
      licencia: new FormControl("", [Validators.required]),
      nacionalidad: new FormControl("", [Validators.required]),
    });

    this.filtroContinentes = [continentsNames.Europe]
  }

  async onSubmit() {
    if(!this.form.valid){
      this.msgResult = 'Verifica los datos ingresados e intenta nuevamente';
      Swal.fire(
        '¡Error en el formulario!',
        this.msgResult,
        'error'
      )
      return;
    }
    const value = this.form.value;
    const respuesta = await this.transporteService.agregarChofer(value);
    if(respuesta){
      Swal.fire(
        '¡Alta exitosa!',
        'Has agregado un nuevo chofer correctamente',
        'success'
      )
    }

    this.form.reset();
    this.msgResult = '';
  }


}
