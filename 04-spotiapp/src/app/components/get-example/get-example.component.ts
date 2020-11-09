import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-get-example',
  templateUrl: './get-example.component.html'
})
export class GetExampleComponent implements OnInit {

  countriesList: any;

  constructor( private http: HttpClient ) {
    this.http.get('https://restcountries.eu/rest/v2/lang/es')
      .subscribe( (response: any) => {
        console.log(response);
        this.countriesList = response;
      });
  }

  ngOnInit(): void {
  }

}
