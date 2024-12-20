import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, forwardRef, Input, NgModule, OnInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { FiltroPipe } from './filtro.pipe';
import { Country, CountryService } from '../../services/country.service';

@Component({
  selector: 'app-selector-pais',
  standalone: true,
  imports: [CommonModule, FormsModule, FiltroPipe],
  templateUrl: './selector-pais.component.html',
  styleUrl: './selector-pais.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectorPaisComponent),
      multi: true,
    },
  ]
})
export class SelectorPaisComponent implements OnInit, ControlValueAccessor {
  paises: Country[] = [];
  selectedCountry: Country | null = null;
  @Input() filtroContinentes: string[] = [];
  busqueda: string | null = null;

  onChange = (codigo: string) => {};
  onTouched = () => {};

  constructor(private paisService: CountryService) {}

  ngOnInit() {
    this.paisService.getAllCountries().subscribe((paises) => {
      if (this.filtroContinentes.length === 0) {
        paises.forEach((pais)=>{
          this.paises.push(pais)
        })
      }
      else{
        paises.forEach((pais)=>{
          if (this.filtroContinentes.includes(pais.continente)) {
            this.paises.push(pais)
          }
        })
      }
    });
  }

  writeValue(codigo: string): void {
    this.selectedCountry = this.paises.find((pais)=>pais.codigo === codigo) || null;
  }

  registerOnChange(fn: (codigo: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  seleccionarPais(pais: Country) {
    this.selectedCountry = pais;
    this.onChange(pais.nombre);
    this.onTouched();
  }

}
