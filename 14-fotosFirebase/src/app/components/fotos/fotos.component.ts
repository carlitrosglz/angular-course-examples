import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Item { nombre: string; url: string }

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styles: [
  ]
})
export class FotosComponent implements OnInit {

  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>('img');
    this.items = this.itemsCollection.valueChanges();

    this.items.subscribe( items => {
      for (const item of items) {
        console.log(item);
      }
    });
  }

  ngOnInit(): void {
  }
}
