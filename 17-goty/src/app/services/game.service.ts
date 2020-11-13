import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Game } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private URL = 'https://goty-backend-app.herokuapp.com';
  private juegos: Game[] = [];

  constructor(private http: HttpClient) { }

  getNominados(): Observable<Game[]> {
    if (this.juegos.length > 0) {
      return of(this.juegos);

    } else {
      return this.http.get<Game[]>(`${this.URL}/goty`)
        .pipe(
          tap(juegos => this.juegos = juegos));
    }
  }

  votarJuego(id: string) {
    return this.http.post(`${this.URL}/goty/${id}`, {})
      .pipe(catchError( err => of(err.error)));
  }
}
