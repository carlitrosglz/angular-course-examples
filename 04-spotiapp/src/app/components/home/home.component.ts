import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  newSpotifyReleases: any[] = [];
  loading: boolean;

  error: boolean;
  mensajeError: string;

  constructor( private spotifyService: SpotifyService) {
    this.loading = true;
    this.error = false;

    spotifyService.getNewReleases()
      .subscribe( (data: any) => {
        this.newSpotifyReleases = data;
        this.loading = false;

        console.log(this.newSpotifyReleases);

      }, (errorService) => {
        this.loading = false;
        this.error = true;

        this.mensajeError = errorService.error.error.message;
      });
  }
}
