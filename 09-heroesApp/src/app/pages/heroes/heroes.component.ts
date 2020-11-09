import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: [
  ]
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  loading = false;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.loading = true;
    this.heroesService.getHeroes()
      .subscribe( response => {
        this.heroes  = response;
        this.loading = false;
      });
  }

  deleteHero(hero: HeroeModel, index: number): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: '¿Quieres eliminar este registro?',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    })
    .then( response => {
      if (response.value){
        this.heroesService.deleteHero(hero.id)
          .subscribe();

        this.heroes.splice(index, 1);
      }
    });
  }
}
