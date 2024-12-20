import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface GithubUser {
  name: string;
  imagen: string;
  pais: string;
}

@Injectable({
  providedIn: 'root'
})
export class GithubUserDataService {

  private apiUrl = 'https://api.github.com/users/pabloalejandrovidal';

  http = inject(HttpClient);

  getUserData(): Observable<GithubUser> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((data: any) => {
        return {name: data.name, imagen: data.avatar_url, pais: data.location};
      })
    );
  }
}
