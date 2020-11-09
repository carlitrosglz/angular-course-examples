import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WishesService } from '../../services/wishes.service';
import { Lista } from '../../models/lista.model';
import { ListaItem } from 'src/app/models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreItem = '';

  constructor(private wishesService: WishesService,
              private router: ActivatedRoute) {

    const listaId = this.router.snapshot.paramMap.get('listaId');

    this.lista = this.wishesService.obtenerLista(listaId);

  }

  ngOnInit() {
  }

  agregarItem() {
    if (this.nombreItem.length === 0) {
      return;
    }

    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);

    this.nombreItem = '';
    this.wishesService.guardarStorage();
  }

  cambioCheck( item: ListaItem){
    const pendientes = this.lista.items
      .filter( itemData => !itemData.isCompleted )
      .length;

    if (pendientes === 0) {
      this.lista.finishedOn = new Date();
      this.lista.isFinished = true;

    } else {
      this.lista.finishedOn = null;
      this.lista.isFinished = false;
    }

    this.wishesService.guardarStorage();
  }

  borrarItem(i: number) {
    this.lista.items.splice(i, 1);
    this.wishesService.guardarStorage();
  }

}
