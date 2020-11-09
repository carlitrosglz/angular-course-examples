import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  artists: any[] = [];
  loading: boolean;

  constructor( private spotifyService: SpotifyService ) { }

  ngOnInit(): void {
  }

  search(termino: string) {
    this.loading = true;

    if (termino.length > 0) {
      this.spotifyService.getArtistList(termino)
      .subscribe( (data: any) => {
        this.artists = data;
        this.loading = false;
      });

    } else {
      this.artists = [];
      this.loading = false;
    }
  }
}
