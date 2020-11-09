import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  // usuario = {
  //   name: '',
  //   surname: '',
  //   email: '',
  //   country: '',
  //   gender: ''
  // };

  usuario = {
    name: 'Carlos',
    surname: 'Gonzalez',
    email: 'carlitrosglz96@gmail.com',
    country: 'ESP',
    gender: 'M'
  };

  paises: any[] = [];

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.countriesService.getCoutries()
      .subscribe( countries => {

        this.paises = countries;
        this.paises.unshift({
          name: '[Seleccione un país]',
          code: ''
        });

      });
  }

  save(form: NgForm): void {
    console.log(form);
    console.log(form.value);

    if (form.invalid){
      Object.values(form.controls).forEach( control => control.markAsTouched());

      return;
    }
  }

}
