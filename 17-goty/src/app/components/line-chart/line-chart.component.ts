import { Component, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnDestroy {

  @Input() results: any[] = [];
  // results : any[] = [
  //   {
  //     'name': 'Juego 1',
  //     'value': 230
  //   },
  //   {
  //     'name': 'Juego 2',
  //     'value': 300
  //   },
  //   {
  //     'name': 'Juego 3',
  //     'value': 175
  //   },
  // ];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Votos';
  showYAxisLabel = true;
  yAxisLabel = 'Juegos';

  colorScheme = 'nightLights';

  interval;

  constructor() {
    //this.randomizeGraphDataInterval();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  };

  onSelect(event): void {
    console.log(event);
  }

  randomizeGraphDataInterval(): void {
    this.interval = setInterval( () => {

    console.log('tick');
    const newResults = [...this.results];

    for (let i in this.results){
      if (newResults[i].value){
        newResults[i].value = Math.round(Math.random() * 100);
      }
    }

    this.results = [...newResults];
    }, 1500);
  }

}
