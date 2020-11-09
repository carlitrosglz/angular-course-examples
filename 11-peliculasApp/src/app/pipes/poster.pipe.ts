import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'poster'
})
export class PosterPipe implements PipeTransform {

  private image_url: string = 'https://image.tmdb.org/t/p/w500';

  transform(poster: string): string {
    return poster ? `${this.image_url}${poster}` : '../../assets/images/no-image.jpg';
  }
}
