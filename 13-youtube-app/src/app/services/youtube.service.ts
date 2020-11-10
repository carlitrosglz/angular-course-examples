import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';


import { YoutubeResponse } from '../models/youtube.models';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private apiBaseUrl    = 'https://www.googleapis.com/youtube/v3';
  private apiKey        = 'AIzaSyCL56AGU1ic5WIhecH6JSigw8gaiMQJEH8';
  private playList      = 'UUuaPTYj15JSkETGnEseaFFg';
  private nextPageToken = '';

  constructor(private http: HttpClient) {}

  // se llama a la API de youtube y devuelve 10 videos por llamada. Se filtra la respuesta
  getVideos() {
    const endPoint = '/playlistItems';
    const params   = new HttpParams()
      .set('part', 'snippet')
      .set('key', this.apiKey)
      .set('playlistId', this.playList)
      .set('maxResults', '10')
      .set('pageToken', this.nextPageToken);

    return this.http.get<YoutubeResponse>(`${this.apiBaseUrl}${endPoint}`, { params })
      .pipe(
        map( resp => {
          this.nextPageToken = resp.nextPageToken;
          return resp.items;
        }),
        map ( items => items.map( video => video.snippet )));
  }
}
