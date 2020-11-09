import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'password'
})
export class PasswordPipe implements PipeTransform {

  transform(value: string, activate: boolean): string {
    return activate ? '*'.repeat(value.length) : value;
  }
}
