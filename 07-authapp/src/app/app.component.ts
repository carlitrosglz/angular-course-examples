import { AUTO_STYLE } from '@angular/animations';
import { Component } from '@angular/core';
import { AuthModule } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth: AuthModule){}
}
