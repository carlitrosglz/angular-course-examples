import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private api = 'AIzaSyBMbVQ07OEBfr6SOPQcSkr-GtmWrGGuRpk';

  userToken: string;

  constructor(private http: HttpClient) {
    this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
  }

  login(user: UsuarioModel) {
    const authData = {
      ... user,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}signInWithPassword?key=${this.api}`,
      authData)
      .pipe(map( response => {
        this.guardarToken(response['idToken']);
        return response;
      }));
  }

  register(user: UsuarioModel) {
    // const authData = {
    //   email: user.email,
    //   password: user.password,
    //   returnSecureToken: true
    // };

    const authData = {
      ... user,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}signUp?key=${this.api}`,
      authData)
      .pipe(map( response => {
        this.guardarToken(response['idToken']);
        return response;
      }));
  }

  isAutenthicated(): boolean {
    if (this.userToken.length < 2) { return false; }

    const expires = Number(localStorage.getItem('expires'));
    const expiraDate = new Date();
    expiraDate.setTime(expires);

    if (expiraDate > new Date()){
      return true;
    } else {
      return false;
    }
  }

  private guardarToken(token: string) {
    this.userToken = token;
    localStorage.setItem('token', token);

    const hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem('expires', hoy.getTime().toString());
  }

  private getToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }
}
