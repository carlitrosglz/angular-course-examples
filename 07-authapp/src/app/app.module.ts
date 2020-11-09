import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthModule } from '@auth0/auth0-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProtegidaComponent } from './components/protegida/protegida.component';
import { PreciosComponent } from './components/precios/precios.component';
import { AuthButtonComponent } from './components/auth-button/auth-button.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProtegidaComponent,
    PreciosComponent,
    AuthButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot({
      domain: 'dev-9mpb61nk.eu.auth0.com',
      clientId: 'b7787Zmnifuvg8n92x1h9ZpXHKDSbGW8'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
