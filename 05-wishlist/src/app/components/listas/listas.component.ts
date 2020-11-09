import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { WishesService } from '../../services/wishes.service';

import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';


@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @Input() terminada = true;
  @ViewChild(IonList) ionlist_html: IonList; // busca todos los ionList del html
  // @ViewChild('lista') lista: IonList; busca los con id 'lista'

  constructor(public deseosService: WishesService,
              private router: Router,
              private alertController: AlertController) {}

  ngOnInit() {}

  listaSeleccionada(lista: Lista){
    if (this.terminada) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
  }

  borrarLista(lista: Lista) {
    this.deseosService.borrarLista(lista);
  }

  async editListName(lista: Lista) {
    const alert = await this.alertController.create({
      header: 'Editar lista',
      inputs: [{
        name: 'title',
        type: 'text',
        value: lista.title,
        placeholder: 'Nombre de la lista'
      }],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Presionado botón cancelar');
          this.ionlist_html.closeSlidingItems();
        }
      },
      {
        text: 'Actualizar',
        handler: data => {
          if (data.title.length > 0){
            lista.title = data.title;
            this.deseosService.guardarStorage();
            this.ionlist_html.closeSlidingItems();
          }
        }
      }]
    });

    alert.present();
  }
}
