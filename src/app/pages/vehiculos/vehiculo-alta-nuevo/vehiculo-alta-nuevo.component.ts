import { Component, Input } from '@angular/core';
import { TiposPermitidos, TransporteService, Vehiculo } from '../../../services/transporte.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { lettersOnlyValidator } from '../../../validators/lettersOnlyValidator';
import { tipoVehiculoValidator } from '../vehiculos-Validators/tipo-vehiculo';
import { numbersOnlyValidator } from '../../../validators/numbersOnlyValidator';
import { distinctUntilChanged, filter, map } from 'rxjs';

@Component({
  selector: 'app-vehiculo-alta-nuevo',
  templateUrl: './vehiculo-alta-nuevo.component.html',
  styleUrl: './vehiculo-alta-nuevo.component.scss'
})
export class VehiculoAltaNuevoComponent {

  constructor(
    private transporteService: TransporteService
  ) { }

  msgResult: string = '';
  message: any = true;
  form!: FormGroup;
  filtroContinentes: string[] = [];
  tiposValidos = TiposPermitidos.join(', ');

  ngOnInit(){
    this.form = new FormGroup({
      nombre: new FormControl("", [lettersOnlyValidator(), Validators.required]),
      tipo: new FormControl("", [tipoVehiculoValidator(), Validators.required]),
      ruedasCantidad: new FormControl("", [numbersOnlyValidator(), Validators.min(2), Validators.max(6), Validators.required]),
      capacidadPromedia: new FormControl("", [numbersOnlyValidator(), Validators.min(2), Validators.max(100), Validators.required]),
    });

    this.form.get('tipo')?.valueChanges.pipe(
      filter(value => !!value), // Filtra valores nulos o vacíos
      map(value => this.eliminarAcentos(value.toLowerCase())),
      distinctUntilChanged() // Evita cambios redundantes
    ).subscribe(transformedValue => {
      this.form.get('tipo')?.setValue(transformedValue, { emitEvent: false });
    });
  }

  eliminarAcentos(texto: string) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
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
    const respuesta = await this.transporteService.agregarVehiculo(value);
    if(respuesta){
      Swal.fire(
        '¡Alta exitosa!',
        'Has agregado un nuevo vehículo correctamente',
        'success'
      )
    }

    this.form.reset();
    this.msgResult = '';
  }

}
