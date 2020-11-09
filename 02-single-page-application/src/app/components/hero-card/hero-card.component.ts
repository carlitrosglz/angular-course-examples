import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Heroe } from '../../services/heroes.service';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styles: [
  ]
})
export class HeroCardComponent implements OnInit {

  // El Input permite inicializar heroe desde fuera (en este caso, desde heroes.component)
  @Input() heroe: Heroe;
  @Input() index: number;

  // El Output permite lanzar un evento al elemento padre (en este caso, a heroes.component)
  // Se recoge la llamada en HTML de heroes.component.html
  @Output() heroeSeleccionado: EventEmitter<number>;

  constructor( private router: Router) {
    this.heroeSeleccionado = new EventEmitter();
  }

  ngOnInit(): void {
  }

  verHeroe(): void {
    this.router.navigate(['/heroe', this.heroe.id]);
    // this.heroeSeleccionado.emit(this.index);
  }

}
