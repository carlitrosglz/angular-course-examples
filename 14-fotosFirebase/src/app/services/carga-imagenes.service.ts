import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

import { finalize } from 'rxjs/operators';

import { FileItem } from '../models/file-item';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  private IMAGE_FOLDER = 'img';

  constructor(private storage: AngularFireStorage,
              private firestore: AngularFirestore) { }

  // Almacenamiento de la imagen y su ruta en DB
  saveImage(image: { nombre: string, url: string }) {
    this.firestore.collection(`/${this.IMAGE_FOLDER}`)
      .add(image);
  }

  // Subida de imagenes al storage
  loadImagesFirebase(images: FileItem[]) {
    for (const item of images) {
      item.isUploading = true;

      this.storage.upload(`${this.IMAGE_FOLDER}/${item.nombreArchivo}`, item.archivo)
        .then(
          snapshot => {
            item.isUploading = false;
            item.progress = 100;

            snapshot.ref.getDownloadURL()
              .then(url => {
                item.url = url;
                this.saveImage({ nombre: item.nombreArchivo, url: item.url });
              });
          },
          error => {
            console.log(error);
          }
        );
    }
  }
}
