import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-auth-button',
  template: `

    <ng-container *ngIf="auth.isAuthenticated$ | async; else loggedOut">
      <button (click)="auth.logout()" class="btn btn-outline-danger">Salir</button>
    </ng-container>

    <ng-template #loggedOut>
      <button (click)="auth.loginWithPopup()" class="btn btn-outline-primary">Entrar</button>
    </ng-template>

  `,
  styles: []
})
export class AuthButtonComponent implements OnInit {

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
  }

}
