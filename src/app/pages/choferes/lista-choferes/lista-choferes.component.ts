import { Component, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, delay, filter, map, Observable, of, startWith } from 'rxjs';
import { Chofer, TransporteService } from '../../../services/transporte.service';
import { Countries, Country, CountryService } from '../../../services/country.service';
import { PdfService } from '../../../services/pdf.service';

@Component({
  selector: 'app-lista-choferes',
  templateUrl: './lista-choferes.component.html',
  styleUrl: './lista-choferes.component.scss'
})
export class ListaChoferesComponent {
  displayedColumns: string[] = ['nombre', 'dni', 'edad', 'nroLicencia', 'licenciaProfecional', 'nacionalidad', 'descarga']; // Define las columnas
  @Input() dataSource = new MatTableDataSource<any>([]);
  choferes: Chofer[] = [];

  searchText: string = ''; // Almacena el texto para filtrar
  searchByName: string = '';
  selectedRow: any = null; // Registro actualmente seleccionado
  selectedChofer: Chofer | null = null;
  selectedChoferCountry: Country | null = null;


  countries: Countries = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private countryService: CountryService,
    private transporteService: TransporteService,
    private pdfService: PdfService,
  ) {
  }

  ngOnInit(): void {
    this.countryService.getAllCountries().subscribe((countries)=>{
      countries.forEach((country)=>{
        this.countries[country.nombre] = country;
      })
    })

    this.transporteService.getChoferes().pipe(
    ).subscribe((choferes)=>{
      this.choferes = choferes;
      this.dataSource = this.getDataSource(choferes)
    })

  }

  getDataSource(choferes: Chofer[]) {
    const dataSource = new MatTableDataSource<any>([]);
    dataSource.paginator = this.paginator;
    dataSource.sort = this.sort;
    dataSource.data = choferes;
    return dataSource;
  }
  // Filtro de búsqueda (opcional)
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSelect(row: Event){
    if (row === this.selectedRow){
      this.selectedRow = null;
      this.selectedChofer = null;
      this.selectedChoferCountry = null;
    }else{
      this.selectedRow = row;
      this.selectedChofer = (row as any as Chofer);
      this.selectedChoferCountry = this.countries[this.selectedChofer.nacionalidad] as any as Country;
    }
  }

  isSelected(row: any): boolean {
    return this.selectedRow === row;
  }

  descargarPdf(chofer: Chofer) {
    this.pdfService.generateChoferesPdf([chofer], this.countries);
  }
  descargarPdfs() {
    if (this.choferes)
    this.pdfService.generateChoferesPdf(this.choferes, this.countries);
  }
}
