import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-switch',
  templateUrl: './ng-switch.component.html',
  styles: [
  ]
})
export class NgSwitchComponent implements OnInit {

  alertTypes: string[] = ['success', 'danger', 'warning', 'default'];
  alert: string = 'info';

  constructor() { }

  ngOnInit(): void {}

  changeAlert(): void {
    this.alert = this.alertTypes[this.getRandomInteger(0, 3)];
  }

  private getRandomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}
