import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit, OnDestroy {

  public moviesList: Movie[] = [];
  public moviesSlideshow: Movie[] = [];

  constructor(private peliculasService: PeliculasService) {}

  @HostListener('window:scroll', ['$event'])
  onScroll(): void{
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if(pos > max) {
      if (this.peliculasService.cargando) { return; }

      console.log("llamando api");
      this.peliculasService.getCartelera()
        .subscribe( movies => {
          this.moviesList.push(...movies);
        });
    }
  }

  ngOnInit(): void {
    this.peliculasService.getCartelera()
      .subscribe( movies => {
        this.moviesList      = movies;
        this.moviesSlideshow = movies;
      });
  }

  ngOnDestroy(): void {
    this.peliculasService.resetPage();
  }

}
