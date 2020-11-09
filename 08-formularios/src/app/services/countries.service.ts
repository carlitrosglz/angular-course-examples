import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) { }

  // devuelve un observable con la data de los paises. Solo name y alphaCode
  getCoutries(){
    return this.http.get('https://restcountries.eu/rest/v2/lang/es')
      .pipe(
        map( (data: any[]) =>
          data.map( country =>
            ({ name: country.name, code: country.alpha3Code }))));
  }
}
