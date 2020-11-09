import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [s: string]: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  validateNumbers(control: FormControl): ErrorValidate {
    const pattern = /\d+/;

    if (control.value?.toString().toLowerCase().match(pattern)){
      return {
        existsNumbers: true
      };
    }

    return null;
  }

  checkUsername(control: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate> {
    if (!control.value) {
      return Promise.resolve(null);
    }

    return new Promise( (resolve, reject) => {
      setTimeout( () => {

        if (control.value === 'pepe'){
          resolve({ exists: true });
        } else {
          resolve(null);
        }

      }, 1000);
    });
  }

  checkPasswords(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];

      if (pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null);

      } else {
        pass2Control.setErrors({isError: true});
      }
    }
  }
}
