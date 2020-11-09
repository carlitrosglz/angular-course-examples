import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Pages components
import { HomeComponent } from './home/home.component';
import { PeliculaComponent } from './pelicula/pelicula.component';
import { SearchComponent } from './search/search.component';

// Módulos
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';
import { RatingModule } from 'ng-starrating';

@NgModule({
  declarations: [HomeComponent, PeliculaComponent, SearchComponent],
  imports: [
    CommonModule,
    PipesModule,
    RatingModule,
    ComponentsModule
  ]
})
export class PagesModule { }
