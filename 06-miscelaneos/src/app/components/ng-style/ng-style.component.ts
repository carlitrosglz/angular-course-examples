import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-style',
  template: `

    <h2>1. NgStyle - ng-style.component.ts</h2>
    <p [style.fontSize.px]="size" >
      Este texto tiene aplicado un fontSize que proviene de una variable de TS.
      Podemos modificar este tamaño mediante eventos (10-30px):
    </p>

    <button class="btn btn-primary" (click)="increaseFontSize()">
      <i class="fa fa-plus"></i>
    </button>

    <button class="btn btn-primary" (click)="reduceFontSize()">
      <i class="fa fa-minus"></i>
    </button>
    <hr>

  `,
  styles: [
  ]
})
export class NgStyleComponent implements OnInit {

  size: number = 20;

  constructor() { }

  ngOnInit(): void {
  }

  reduceFontSize(): void{
    if (this.size >= 10){
      this.size -= 5;
    }
  }

  increaseFontSize(): void{
    if (this.size <= 30){
      this.size += 5;
    }
  }
}
