import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

import { Mensaje } from '../interface/mensaje.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<any>;
  public chats: Mensaje[] = [];
  public usuario: any = {};

  constructor(private firestore: AngularFirestore,
              public auth: AngularFireAuth) {

    this.auth.authState.subscribe( user => {
      console.log('Estado del usuario: ', user);
      if (!user) { return; }

      this.usuario.nombre = user.displayName;
      this.usuario.uid    = user.uid;
      this.usuario.photo  = user.photoURL;
    });
  }

  login(provider: string) {
    if (provider === 'google'){
      this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } else {
      this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      // this.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
    }
  }

  logout() {
    this.auth.signOut();
    this.usuario = {};
  }

  loadMessages() {
    this.itemsCollection = this.firestore
      .collection<Mensaje>('chats', query => query.orderBy('date', 'desc')
      .limit(5));

    return this.itemsCollection
    .valueChanges()
    .pipe(map(
      (mensajes: Mensaje[]) => {
        console.log(mensajes);
        // this.chats = mensajes;

        this.chats = [];
        for (const mensaje of mensajes){
          this.chats.unshift(mensaje);
        }

        return this.chats;
      }));
  }

  sendMessage(text: string) {
    // TODO: falta el UID del user
    const mensaje: Mensaje = {
      name: this.usuario.nombre,
      message: text,
      date: new Date().getTime(),
      uid: this.usuario.uid,
      photo: this.usuario.photo
    };

    return this.itemsCollection.add(mensaje);

  }
}
