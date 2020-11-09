import { Component } from '@angular/core';

@Component({
    selector: 'app-body',
    templateUrl: './body.component.html'
})

export class BodyComponent {

    text: any = {
        message: 'Un gran poder requiere una gran responsabilidad.',
        author: 'Ben Parker'
    };

    isVisible = true;

    characters: string[] = [
        'Spiderman',
        'Venom',
        'Octopus'
    ];

    showMessage(): void {
        this.isVisible = !this.isVisible;
    }

    getButtonText(): string {
        if (this.isVisible){
            return 'Ocultar';
        } else {
            return 'Mostrar';
        }
    }
}
