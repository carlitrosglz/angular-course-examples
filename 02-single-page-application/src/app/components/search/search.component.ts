import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HeroesService, Heroe } from '../../services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  heroes: Heroe[] = [];
  heroName: string;

  constructor( private heroesService: HeroesService,
               private router: Router,
               private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this.heroName = params['text'];
      this.heroes = this.heroesService.searchHero(params['text']);
    });
  }

  verHeroe(index: number): void {
    this.router.navigate(['/heroe', index]);
  }

}
