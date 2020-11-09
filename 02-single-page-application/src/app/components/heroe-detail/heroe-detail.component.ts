import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HeroesService, Heroe } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe-detail.component.html'
})
export class HeroeComponent implements OnInit {

  heroe: Heroe;

  constructor( private activatedRoute: ActivatedRoute,
               private heroesService: HeroesService ) {

    this.activatedRoute.params.subscribe( params => {
      this.heroe = this.heroesService.getSingleHeroById(params['id']);
    });
  }

  ngOnInit(): void {
  }
}
