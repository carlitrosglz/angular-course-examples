import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { WishesService } from '../../services/wishes.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor( private deseosService: WishesService,
               private router: Router,
               private alertController: AlertController ) {

  }

  // Con async, convertimos la función en una Promise
  async agregarLista() {
    // this.router.navigateByUrl('/tabs/tab1/agregar');
    const alert = await this.alertController.create({
      header: 'Nueva lista',
      inputs: [{
        name: 'title',
        type: 'text',
        placeholder: 'Nombre de la lista'
      }],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => console.log('Presionado botón cancelar')
      },
      {
        text: 'Crear',
        handler: data => {
          if (data.title.length > 0){
            const listaId = this.deseosService.crearLista(data.title);

            this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
          }
        }
      }]
    });

    alert.present();
  }

  // listaSeleccionada(lista: Lista){
  //   this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
  // }

}
