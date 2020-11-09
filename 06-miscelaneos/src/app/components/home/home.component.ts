import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `

    <app-ng-style></app-ng-style>

    <app-css></app-css>

    <p>
        Hello World from app.component (p color: blue definido en src/styles.css)
    </p>
    <br>

    <app-ng-class></app-ng-class>

    <app-custom-directives></app-custom-directives>

    <app-ng-switch></app-ng-switch>
  `,
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
