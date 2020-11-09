import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListasComponent } from './listas/listas.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    ListasComponent
  ],
  exports: [
    ListasComponent
  ],
  imports: [
    CommonModule, // -> este modulo incorpora algunas directivas de angular, como ngIf ngFor etc
    IonicModule,
    PipesModule
  ]
})
export class ComponentsModule { }
