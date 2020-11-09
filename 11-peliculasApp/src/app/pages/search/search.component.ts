import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  public searchResult: Movie[] = [];
  public query: string = '';

  constructor(private activatedRoute: ActivatedRoute,
              private peliculasService: PeliculasService) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe( params => {
        this.peliculasService.searchMovie(params.text)
          .subscribe( response => {
            this.query        = params.text;
            this.searchResult = response;
          });
      });
  }
}
