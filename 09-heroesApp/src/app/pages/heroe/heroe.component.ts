import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
  ]
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor(private heroesService: HeroesService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id !== 'nuevo'){
      this.heroesService.getHeroById(id)
        .subscribe( (response: HeroeModel) => {
          this.heroe = response;
          this.heroe.id = id;
        } );
    }
  }

  save(form: NgForm): void {
    if (form.invalid) {
      console.log('Form is invalid!');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.heroe.id) {
      peticion = this.heroesService.updateHero(this.heroe);

    } else {
      peticion = this.heroesService.createHero(this.heroe);
    }

    peticion.subscribe( response => {
      Swal.fire({
        title: this.heroe.name,
        text: 'Se actualizó correctamente.',
        icon: 'success',
      });
    });

  }

}
