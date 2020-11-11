import { FileItem } from '../models/file-item';
import { Directive, EventEmitter, ElementRef,
         HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() archivos: FileItem[] = [];
  @Output() mouseOver: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any): void {
    this.mouseOver.emit(true);
    this.prevenirDetener(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any): void {
    this.mouseOver.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any): void {
    const transferencia = this.getTransferencia(event);

    if (!transferencia) { return; }

    this.extraerArchivos(transferencia.files);
    this.prevenirDetener(event);

    this.mouseOver.emit(false);
  }

  private getTransferencia(event: any) {
    return event.dataTransfer ?
      event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private extraerArchivos( archivosLista: FileList) {
    // tslint:disable-next-line:forin
    for (const propiedad in Object.getOwnPropertyNames(archivosLista)){
      const archivoTemporal = archivosLista[propiedad];

      if (this.archivoPuedeSerCargado(archivoTemporal)) {
        const nuevoArchivo = new FileItem(archivoTemporal);
        this.archivos.push(nuevoArchivo);
      }
    }

    console.log(this.archivos);
  }

  // Validaciones
  private archivoPuedeSerCargado( archivo: File ): boolean {
    if (!this.archivoYaFueDroppeado(archivo.name) && this.esImagen(archivo.type)){
      return true;

    } else {
      return false;
    }
  }

  private prevenirDetener(event){
    event.preventDefault();
    event.stopPropagation();
  }

  private archivoYaFueDroppeado(nombreArchivo: string): boolean {
    for (const archivo of this.archivos){
      if (archivo.nombreArchivo === nombreArchivo) {
        console.log('El archivo ' + nombreArchivo + ' ya está agregado');
        return true;
      }
    }

    return false;
  }

  private esImagen(tipoArchivo: string): boolean {
    return (tipoArchivo === '' || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('image');
  }
}
