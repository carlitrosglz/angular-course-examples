import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { subscribeOn } from 'rxjs/operators';

import { ValidatorsService } from '../../services/validators.service';


@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private customValidators: ValidatorsService) {

    this.createForm();
    this.loadDataForm();
    this.setListeners();
  }

  ngOnInit(): void {
  }

  validateField(field: string): boolean {
    return this.form.get(field).invalid && this.form.get(field).touched;
  }

  addHobby(): void {
    this.hobbiesForm
      .push(this.formBuilder.control(''));
  }

  deleteHobby(index: number): void {
    this.hobbiesForm
      .removeAt(index);
  }

  save(): void {
    console.log(this.form);
    console.log(this.form.value);

    if (this.form.invalid){

      return Object.values(this.form.controls).forEach( control => {

        if (control instanceof FormGroup){
          Object.values(control.controls).forEach(controlFromGroup => controlFromGroup.markAsTouched());

        } else {
          control.markAsTouched();
        }

      });
    }

    // POST del form
    this.form.reset();
  }

  // Validadores sincronos: no dependen de ningún servicio externo
  private createForm(): void{

    this.form = this.formBuilder.group({
      name     : ['', [Validators.required, Validators.minLength(5), this.customValidators.validateNumbers]],
      surname  : ['', [Validators.required, , this.customValidators.validateNumbers]],
      email    : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      userName : ['', , this.customValidators.checkUsername ],
      pass1    : ['', Validators.required],
      pass2    : ['', Validators.required],
      address  : this.formBuilder.group({
        hood: ['', Validators.required],
        city: ['', Validators.required]
      }),
      // argumentos de this.formBuilder.array --> [controles], [validators sincronos], [validators async]
      hobbies: this.formBuilder.array([], [], [])
    },
    {
      validators: this.customValidators.checkPasswords('pass1', 'pass2')
    });

    // this.form = this.formBuilder.group({
    //   name    : ['Carlos'],
    //   surname : ['Gonzalez'],
    //   email   : ['carlitrosglz96@gmail.com']
    // });
  }

  private loadDataForm(): void {
    // this.form.setValue({
      this.form.reset({
      name: 'Carlos',
      surname: 'Gonzalez',
      email: 'correo@correo.com',
      pass1: '123',
      pass2: '123',
      address: {
        hood: 'San Lorenzo',
        city: 'Terrassa'
      }
    });
  }

  private setListeners(): void {
    this.form.valueChanges.subscribe( value => console.log(value));

    this.form.statusChanges.subscribe(status => console.log(status));

    this.form.get('name').valueChanges.subscribe( value => console.log(value));
  }

  // getter. No lo voy a usar, ver metodo validateField()
  get isNameValid(): boolean {
    return this.form.get('name').invalid && this.form.get('name').touched;
  }

  get hobbiesForm() {
    return this.form.get('hobbies') as FormArray;
  }

  get validatePassword2(): boolean {
    const pass1 = this.form.get('pass1').value;
    const pass2 = this.form.get('pass2').value;

    return (pass1 === pass2) ? false : true;
  }

}
