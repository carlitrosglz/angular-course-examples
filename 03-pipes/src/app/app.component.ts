import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name    : string    = 'cARloS GonZAlEz';
  array   : number[]  = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  PI      : number    = Math.PI;
  percent : number    = 0.234;
  salary  : number    = 2130;
  date    : Date      = new Date();
  idioma  : string    = 'es';
  videoUrl: string    = 'https://www.youtube.com/embed/tAGnKpE4NCI';
  activate: boolean   = true;

  myPromise = new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve('Llegó la data');
    }, 4500);
  });

  hero = {
    key: 'Wolverine',
    name: 'Logan',
    age: 500,
    address: {
      streetName: 'First Street',
      number: 20
    }
  };
}
