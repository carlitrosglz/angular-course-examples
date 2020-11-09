import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-artist-card',
  templateUrl: './artist-card.component.html',
  styles: [
  ]
})
export class ArtistCardComponent implements OnInit {

  @Input() artistList: any[] = [];

  constructor( private router: Router ) { }

  ngOnInit(): void {
  }

  verArtista(item: any){
    let artistId;

    if (item.type === 'artist'){
      artistId = item.id;

    } else {
      artistId = item.artists[0].id;
    }

    this.router.navigate(['artist', artistId]);
  }

}
