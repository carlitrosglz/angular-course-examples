import { Component, OnInit } from '@angular/core';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { FileItem } from '../../models/file-item';
import { CargaImagenesService } from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: [
  ]
})
export class CargaComponent implements OnInit {

  estaSobreElemento: boolean = false;
  archivos: FileItem[] = [];

  constructor(public service: CargaImagenesService) { }

  ngOnInit(): void {
  }

  cargarImagenes(): void{
    this.service.loadImagesFirebase(this.archivos);
  }

  limpiarArchivos(): void {
    this.archivos = [];
  }

}
