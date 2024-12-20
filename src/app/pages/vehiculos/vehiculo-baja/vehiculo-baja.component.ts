import { Component, Input } from '@angular/core';
import { TransporteService, Vehiculo } from '../../../services/transporte.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculo-baja',
  templateUrl: './vehiculo-baja.component.html',
  styleUrl: './vehiculo-baja.component.scss'
})
export class VehiculoBajaComponent {
  @Input() vehiculo: Vehiculo | null = null;
  constructor(
    private transporteService: TransporteService,
  ){
  }

  async confirmDelete() {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      this.deleteVehiculo();
    }
  }

  async deleteVehiculo() {
    if (this.vehiculo){
      try {
        await this.transporteService.eliminarVehiculo(this.vehiculo.id);
        Swal.fire(
          '¡Eliminado!',
          'El vehículo ha sido eliminado exitosamente.',
          'success'
        );
        this.vehiculo = null;
      } catch (error) {
        Swal.fire(
          'Error',
          'No se pudo eliminar el vehículo. Intenta nuevamente más tarde.',
          'error'
        );
      }
    }
  }

}
