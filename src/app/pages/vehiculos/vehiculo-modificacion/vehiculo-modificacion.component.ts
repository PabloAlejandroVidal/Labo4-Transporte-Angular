import { Component, Input, SimpleChanges } from '@angular/core';
import { TiposPermitidos, TransporteService, Vehiculo } from '../../../services/transporte.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { lettersOnlyValidator } from '../../../validators/lettersOnlyValidator';
import { tipoVehiculoValidator } from '../vehiculos-Validators/tipo-vehiculo';
import { numbersOnlyValidator } from '../../../validators/numbersOnlyValidator';
import { distinctUntilChanged, filter, map } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculo-modificacion',
  templateUrl: './vehiculo-modificacion.component.html',
  styleUrl: './vehiculo-modificacion.component.scss'
})
export class VehiculoModificacionComponent {
  @Input() vehiculo: Vehiculo | null = null;
  public id: string | null = null;

  constructor(
    private transporteService: TransporteService
  ) { }

  msgResult: string = '';
  message: any = true;
  form!: FormGroup;
  filtroContinentes: string[] = [];
  tiposValidos = TiposPermitidos.join(', ');

  ngOnInit(){
    if(this.vehiculo?.id){
      this.id = this.vehiculo.id;
    }

    this.form = new FormGroup({
      nombre: new FormControl(this.vehiculo?.nombre, [lettersOnlyValidator(), Validators.required]),
      tipo: new FormControl(this.vehiculo?.tipo, [tipoVehiculoValidator(), Validators.required]),
      ruedasCantidad: new FormControl(this.vehiculo?.ruedasCantidad, [numbersOnlyValidator(), Validators.min(2), Validators.max(6), Validators.required]),
      capacidadPromedia: new FormControl(this.vehiculo?.capacidadPromedia, [numbersOnlyValidator(), Validators.min(2), Validators.max(100), Validators.required]),
    });

    this.form.get('tipo')?.valueChanges.pipe(
      filter(value => !!value), // Filtra valores nulos o vacíos
      map(value => this.eliminarAcentos(value.toLowerCase())),
      distinctUntilChanged() // Evita cambios redundantes
    ).subscribe(transformedValue => {
      this.form.get('tipo')?.setValue(transformedValue, { emitEvent: false });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Detectar cambios en 'vehiculo' y actualizar el formulario
    if (changes['vehiculo'] && this.vehiculo) {
      this.actualizarFormulario();
    }
  }

  actualizarFormulario(): void {
    if (this.vehiculo) {
      this.id = this.vehiculo.id; // Actualizar el ID
      this.form.patchValue({ // Actualizar el formulario con los datos del vehículo
        nombre: this.vehiculo.nombre,
        tipo: this.vehiculo.tipo,
        ruedasCantidad: this.vehiculo.ruedasCantidad,
        capacidadPromedia: this.vehiculo.capacidadPromedia,
      });
    }
  }

  eliminarAcentos(texto: string) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  async onSubmit() {
    if(!this.form.valid || !this.id){
      this.msgResult = 'Verifica los datos ingresados e intenta nuevamente';
      Swal.fire(
        '¡Error en el formulario!',
        this.msgResult,
        'error'
      )
      return;
    }
    const value = this.form.value;
    const respuesta = await this.transporteService.modificarVehiculo(this.id, value).then(()=>{
      Swal.fire(
        'Modificación exitosa!',
        'Has Modificado el vehículo correctamente',
        'success'
      )
    });

    this.form.reset();
    this.msgResult = '';
  }

}
