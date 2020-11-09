import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';


@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styles: [
  ]
})
export class ArtistComponent implements OnInit {

  artist: any = {};
  topTracks: any[] = [];
  loading: boolean;

  constructor( private router: ActivatedRoute,
               private spotifyService: SpotifyService ) {

    this.loading = true;

    this.router.params.subscribe( params => {
      this.getArtist(params['id']);
      this.getTopTracks(params['id']);
    });
  }

  ngOnInit(): void {
  }

  getArtist(id: string) {
    this.spotifyService.getArtist(id)
      .subscribe( artista => {
        this.artist = artista;
        this.loading = false;
      });
  }

  getTopTracks(id: string) {
    this.spotifyService.getTopTracks(id)
      .subscribe( topTracks => {
        console.log(topTracks);
        this.topTracks = topTracks;
      });
  }
}
