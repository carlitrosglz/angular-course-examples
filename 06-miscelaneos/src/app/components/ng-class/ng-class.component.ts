import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-class',
  templateUrl: './ng-class.component.html',
  styles: [
  ]
})
export class NgClassComponent implements OnInit {

  message   : string = 'This is a DANGER alert message. This type is preloaded by default!';
  alertType : string = 'alert-danger';

  properties = {
    danger: false
  };

  loading: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  changeToInfoAlert(): void{
    this.alertType = 'alert-info';
    this.message = 'This is an INFO alert message.';
  }

  changeToSuccessAlert(): void{
    this.alertType = 'alert-success';
    this.message = 'This is a SUCCESS alert message.';
  }

  execute(){
    this.loading = true;

    setTimeout(() => this.loading = false, 3000);
  }
}
