// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

// components
import { NavbarComponent } from './navbar/navbar.component';
import { LineChartComponent } from './line-chart/line-chart.component';

@NgModule({
  declarations: [
    NavbarComponent,
    LineChartComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  exports: [
    NavbarComponent,
    LineChartComponent
  ]
})
export class ComponentsModule { }
