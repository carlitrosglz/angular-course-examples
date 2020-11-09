import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string, capitalizeAll: boolean): string {
    let aux = value.toLowerCase().split(' ');

    if (capitalizeAll) {
      aux = aux.map( name => {
        return name[0].toUpperCase().concat(name.substr(1));
      });

      return aux.join(' ');

    } else {
      aux[0] = aux[0][0].toUpperCase() + aux[0].substr(1);
    }

    return aux.join(' ');
  }
}
