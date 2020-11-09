import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { PeliculasService } from '../../services/peliculas.service';
import { MovieDetail } from '../../interfaces/movie-detail-response';
import { Cast } from '../../interfaces/credits-response';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styles: [
  ]
})
export class PeliculaComponent implements OnInit {

  public movie: MovieDetail;
  public cast : Cast[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private service: PeliculasService,
              private location: Location) { }

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.params.id;

    combineLatest([
      this.service.getMovieDetail(id),
      this.service.getMovieCast(id)

    ]).subscribe( ([pelicula, cast]) => {
      if (!pelicula){
        this.router.navigateByUrl('/home');
        return;
      }

      this.movie = pelicula;
      this.cast = cast.filter( actor => actor.profile_path != null );
    });

    /*this.service.getMovieDetail(id)
      .subscribe( movie => {
        if (!movie) {
          this.router.navigateByUrl('/home');
          return;
        }

        this.movie = movie;
      });

    this.service.getMovieCast(id)
      .subscribe(response => {
        this.cast = response.filter( actor => actor.profile_path != null );
      });*/

  }

  goBack(): void {
    this.location.back();
  }
}
