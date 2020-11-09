import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { MovieDetail } from '../interfaces/movie-detail-response';
import { CreditsResponse, Cast } from '../interfaces/credits-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl = 'https://api.themoviedb.org/3/';
  private carteleraPage = 1;
  public cargando = false;

  constructor(private http: HttpClient) { }

  get params() {
    return {
      api_key: '2ecbb80f18017e9c6917aaf245633d50',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }
  }

  getCartelera(): Observable<Movie[]> {
    if (this.cargando){
      return of([]); // la funcion of de rxjs devuelve observables
    }

    this.cargando = true;

    return this.http.get<CarteleraResponse>(`${this.baseUrl}movie/now_playing?`, {params: this.params})
      .pipe(
        map( (resp) => resp.results ),
        tap( () => {
          this.carteleraPage += 1;
          this.cargando       = false;
        }));
  }

  searchMovie(movie: string): Observable<Movie[]> {
    const params = {...this.params, page: '1', query: movie};

    return this.http.get<CarteleraResponse>(`${this.baseUrl}search/movie`, { params })
      .pipe(
        map( resp => resp.results )
      );
  }

  getMovieDetail(id: string): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(`${this.baseUrl}movie/${id}`, { params: this.params })
      .pipe(
        catchError( err => of(null)));
  }

  getMovieCast(id: string): Observable<Cast[]> {
    return this.http.get<CreditsResponse>(`${this.baseUrl}movie/${id}/credits`, { params: this.params })
      .pipe(
        map( resp => resp.cast ),
        catchError( err => of([])));
  }

  resetPage(): void {
    this.carteleraPage = 1;
  }
}
