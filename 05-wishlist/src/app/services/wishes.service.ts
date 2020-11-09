import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class WishesService {

  private listas: Lista[] = [];

  constructor() {
    // el constructor de un servicio solo se ejecuta una vez. La primera vez que se llame al servicio,
    // el servicio queda disponible para toda la app. SINGLETON
    this.cargarStorage();
   }

   getListas(): Lista[] {
     return this.listas;
   }

   crearLista( title: string ){
    const newList = new Lista(title);
    this.listas.push(newList);
    this.guardarStorage();

    return newList.id;
   }

   obtenerLista( id: string | number ) {
     id = Number(id);

     return this.listas.find( listaData => listaData.id === id);
   }

   borrarLista(lista: Lista) {
     this.listas = this.listas.filter( data => data.id !== lista.id);
     this.guardarStorage();
   }

   guardarStorage() {
     // local storage guarda valores (strings) en formato key:value - esto no es una BD. Puede llegar a ser eliminado
     // a través de la libreria JSON y el metodo stringify, convertimos un array a json
     localStorage.setItem('data', JSON.stringify(this.listas));
   }

   cargarStorage() {
    if (localStorage.getItem('data')) {
      this.listas = JSON.parse(localStorage.getItem('data'));
    }
   }
}
