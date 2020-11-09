import { Component, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Marcador } from '../../classes/marcador.class';
import { EditMapComponent } from './edit-map.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  marcadores: Marcador[] = [];

  constructor(private snackbar: MatSnackBar,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    this.load();
  }

  openDialog(marcador: Marcador): void {
    const dialogRef = this.dialog.open(EditMapComponent, {
      width: '250px',
      data: { title: marcador.title, description: marcador.description }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) { return; }

      marcador.title = result.title;
      marcador.description = result.desc;

      this.save();
      this.snackbar.open('Marcador actualizado', 'Cerrar', { duration: 2000 });
    });
  }


  addMark(event): void {
    this.marcadores.push(new Marcador(
      event.coords.lat,
      event.coords.lng
    ));

    this.save();

    this.snackbar.open('Marcador agregado', 'Cerrar', { duration: 2000 });
  }

  deleteMark(index: number): void {
    this.marcadores.splice(index, 1);
    this.save();

    this.snackbar.open('Marcador eliminado', 'Cerrar', { duration: 2000 });
  }

  save(): void {
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }

  load(): void {
    if (localStorage.getItem('marcadores')){
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
    }
  }

}
