import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

export interface Countries {
  [key: string]: Country;
}

export interface Country {
  nombre: string;
  flag: string;
  continente: string;
  codigo: string
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1/all';

  private countriesSubject = new BehaviorSubject<Country[]>([]);

  constructor(private http: HttpClient) {
    this.loadCountries();
  }

  private loadCountries(): void {
    if (this.countriesSubject.getValue().length > 0) {
      return;
    }

    this.http.get<any[]>(this.apiUrl).pipe(
      map((countries: any[]) =>
        countries.map(country => ({
          nombre: country.translations.spa.common,
          flag: country.flags.png,
          continente: country.continents[0],
          codigo: country.cca3,
        }))
      ),
      tap(countries => this.countriesSubject.next(countries)) // Actualiza el BehaviorSubject
    ).subscribe({
      error: err => console.error('Error al cargar países:', err),
    });
  }

  getAllCountries(): Observable<Country[]> {
    return this.countriesSubject.asObservable();
  }

  getShuffledCountries(quantity: number = 0): Observable<Country[]> {
    return this.getAllCountries().pipe(
      map((countries: Country[]) => {
        const maxQuantity = (quantity > countries.length || quantity <= 0) ? countries.length : quantity;
        const shorterCountriesArray = countries.slice(0, maxQuantity);
        return this.shuffleArray(shorterCountriesArray);
      })
    )
  }

  shuffleArray(array: Country[]): Country[] {
    return array.sort(() => Math.random() - 0.5);
  }

}
