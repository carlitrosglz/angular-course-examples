import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-directives',
  template: `

    <h2>4. Directivas personalizadas - ResaltadoDirective</h2>

    <p appResaltado [colorSelected]="color">A este texto se le está aplicando la directiva RESALTADO.
      <br>Haz HOVER encima del texto para ver el resultado de la directiva.
      <br>El color por defecto es AMARILLO. Pulsa los botones para seleccionar otro color.
    </p>

    <button (click)="color = '#93de81'" class="btn btn-success">GREEN</button>
    <button (click)="color = '#e66653'" class="ml-2 btn btn-danger">RED</button>
    <button (click)="color = '#76dcde'" class="ml-2 btn btn-info">BLUE</button>
    <button (click)="color = 'yellow'"    class="ml-2 btn btn-warning">YELLOW</button>

    <br><br>

  `,
  styles: [`p{font-size: 20px;}`]
})
export class CustomDirectivesComponent implements OnInit {

  color: string;

  constructor() { }

  ngOnInit(): void {
  }

}
