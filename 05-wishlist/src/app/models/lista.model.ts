import { ListaItem } from './lista-item.model';

export class Lista {

    id: number;
    title: string;
    createdOn: Date;
    finishedOn: Date;
    isFinished: boolean;
    items: ListaItem[];

    constructor( title: string ) {
        this.id = new Date().getTime();
        this.title = title;
        this.createdOn = new Date();
        this.isFinished = false;
        this.items = [];
    }
}