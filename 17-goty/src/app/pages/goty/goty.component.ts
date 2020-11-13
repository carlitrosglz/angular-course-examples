import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Game } from '../../interfaces/interfaces';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-goty',
  templateUrl: './goty.component.html',
  styleUrls: ['./goty.component.css']
})
export class GotyComponent implements OnInit {

  juegos: Game[] = [];

  constructor(private service: GameService) { }

  ngOnInit(): void {
    this.service.getNominados()
      .subscribe( response => {
        console.log(response);
        this.juegos = response;
      });
  }

  vote(juego: Game) {
    this.service.votarJuego(juego.id)
      .subscribe( (response: { ok: boolean, message: string}) => {
        if (response.ok){
          Swal.fire('Gracias', response.message, 'success');
        } else {
          Swal.fire('Oops...', response.message, 'error');
        }
      });
  }

}
