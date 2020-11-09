import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective {

  @Input() colorSelected: string;

  constructor(private elementRef: ElementRef) {}

  @HostListener('mouseenter') mouseHover(): void {
    this.resaltar(this.colorSelected || 'yellow'); // en caso de null el color será YELLOW
  }

  @HostListener('mouseleave') mouseUnhovered(): void {
    this.resaltar(null);
  }

  private resaltar(color: string): void {
    this.elementRef.nativeElement.style.backgroundColor = color;
  }

}
