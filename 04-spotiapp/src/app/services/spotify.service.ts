import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private CLIENT_ID     = '4adec2004dca429882ffad0da00f0b85';
  private CLIENT_SECRET = 'ae2f7c6acdfe49b8897a19c12988dc6b';
  private TOKEN: string;

  constructor( private http: HttpClient ) { }

  // private getAccessToken() {
  //   const URL = `http://localhost:3000/${this.CLIENT_ID}/${this.CLIENT_SECRET}`;

  //   return this.http.get(URL);
  // }

  private getQuery(query: string) {
    const URL = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      //'Authorization': `${this.getAccessToken()}`
      'Authorization': 'Bearer BQCD_QeUppINmTWSVPU_8r-UZZH-ysRJAxjPNHDQkCGfpZivjGEjq1ch_1tSpIBcNTJ0slv9UvixmHa4yME'
    });

    return this.http.get(URL, {headers});
  }

  public getNewReleases() {
    return this.getQuery('browse/new-releases?limit=20')
      .pipe(map(data => data['albums'].items));
  }

  public getArtistList(artist: string) {
    return this.getQuery(`search?q=${artist}&type=artist&limit=15`)
      .pipe(map( data => data['artists'].items));
  }

  public getArtist(artistId: string) {
    return this.getQuery(`artists/${artistId}`);
  }

  public getTopTracks(artistId: string) {
    return this.getQuery(`artists/${artistId}/top-tracks?country=us`)
      .pipe(map( data => data['tracks']));
  }
}
