import { Component, OnInit } from '@angular/core';
import { HeroesService, Heroe } from '../../services/heroes.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html'
})
export class HeroesComponent implements OnInit {

  heroes: Heroe[] = [];

  constructor( private heroesService: HeroesService,
               private router: Router) { }

  ngOnInit(): void {
    this.heroes = this.heroesService.getHeroesData();
  }

  verHeroe(index: number): void {
    this.router.navigate(['/heroe', index]);
  }
}
