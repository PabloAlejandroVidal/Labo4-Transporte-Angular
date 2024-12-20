import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TransporteService, Vehiculo } from '../../../services/transporte.service';
import { Country, CountryService } from '../../../services/country.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PdfService } from '../../../services/pdf.service';

@Component({
  selector: 'app-vehiculos-lista',
  templateUrl: './vehiculos-lista.component.html',
  styleUrl: './vehiculos-lista.component.scss'
})
export class VehiculosListaComponent {

  displayedColumns: string[] = ['id', 'nombre', 'tipo', 'ruedasCantidad', 'capacidadPromedia'];
  dataSource = new MatTableDataSource<any>([]);

  searchText: string = ''; // Almacena el texto para filtrar
  selectedRow: any = null; // Registro actualmente seleccionado
  selectedVehiculo: Vehiculo | null = null;
  vehiculos: Vehiculo[] = [];

  countries: any = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private pdfService: PdfService,
    private countryService: CountryService,
    private transporteService: TransporteService
  ) {
  }

  ngOnInit(): void {
    this.countryService.getAllCountries().subscribe((countries)=>{
      countries.forEach((country)=>{
        this.countries[country.nombre] = country;
      })
    })

    this.transporteService.getVehiculos().subscribe((vehiculos)=>{
      this.vehiculos = vehiculos;
      this.dataSource.data = vehiculos;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      if (vehiculos.length <= 0){
        this.selectedRow = null;
        this.selectedVehiculo = null
      }
    })

  }

  // Filtro de búsqueda (opcional)
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSelect(row: Event){
    if(this.selectedRow == row){
      this.selectedRow = null;
      this.selectedVehiculo = null;
    }
    else{
      this.selectedRow = row;
      this.selectedVehiculo = (row as any as Vehiculo);
    }
  }

  isSelected(row: any): boolean {
    return this.selectedRow === row;
  }

  async descargarPdfs() {
    await this.pdfService.generateVehiculosPdf(this.vehiculos);
  }
}
