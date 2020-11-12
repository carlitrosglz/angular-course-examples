import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-virtual',
  templateUrl: './virtual.component.html',
  styles: [
  ]
})
export class VirtualComponent implements OnInit {

  @ViewChild( CdkVirtualScrollViewport ) viewport: CdkVirtualScrollViewport;

  personas = Array(500).fill(0);

  constructor() { }

  ngOnInit(): void {
  }

  irInicio(): void {
    this.viewport.scrollToIndex(0);
  }

  irMitad(): void {
    this.viewport.scrollToIndex(this.personas.length / 2);
  }

  irFinal(): void {
    this.viewport.scrollToIndex(this.personas.length);
  }

}
