export class ListaItem {

    description: string;
    isCompleted: boolean;

    constructor( description: string ) {
        this.description = description;
        this.isCompleted = false;
    }
}