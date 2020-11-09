import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { EditMapComponent } from './components/map/edit-map.component';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  entryComponents: [
    EditMapComponent
  ],
  declarations: [
    AppComponent,
    MapComponent,
    EditMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCUYEQA9PTL1YzXpgkQ4b5ZxtTW8SC5evY'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
