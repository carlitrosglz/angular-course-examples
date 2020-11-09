import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-css',
  template: `
    <h2>2. Aplicando CSS a un solo componente</h2>
    <p>
      Este texto (tag P) tiene aplicado un css propio, definido en css.component.ts.
      Se definen todos los tags P de color rojo, PERO este estilo no aplica de forma global a la app,
      sino al componente donde esté declarado. El siguiente texto pertenece a otro componente, siendo también
      un tag P, pero no se le aplica el CSS del componente anterior. <br>
      <small>El único CSS global es el que está en src/styles.css -- este sí que puede sobreescribir los otros estilos --</small>
    </p>
  `,
  styles: [`
    p {
      color: red;
      font-size: 20px;
    }
  `
  ]
})
export class CssComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
