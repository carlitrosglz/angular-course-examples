import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';


import { HeroeModel } from '../models/heroe.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://backend-login-app.firebaseio.com';

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<any> {
    return this.http.get(`${this.url}/heroes.json`)
      .pipe(
        map(this.crearArreglo),
        delay(1500));
  }

  getHeroById(id: string): Observable<any> {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  createHero(hero: HeroeModel): Observable<any> {
    return this.http.post(`${this.url}/heroes.json`, hero)
      .pipe(
        map( (response: any) => {
          hero.id = response.name;
          return hero;
        }));
  }

  updateHero(hero: HeroeModel): Observable<any> {
    return this.http.put(`${this.url}/heroes/${hero.id}.json`, this.deleteHeroAuxId(hero));
  }

  deleteHero(id: string): Observable<any> {
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  private deleteHeroAuxId(hero: HeroeModel): HeroeModel {
    // La siguiente const rompe la referencia de JS hacia el objeto hero que llega por parámetro
    const heroAux = {
      ...hero
    };
    delete heroAux.id;

    return heroAux;
  }

  private crearArreglo(heroesObj: object){
    if (heroesObj === null) { return []; }

    const heroes: HeroeModel[] = [];

    Object.keys(heroesObj).forEach( key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;

      heroes.push(heroe);
    });

    return heroes;
  }
}
