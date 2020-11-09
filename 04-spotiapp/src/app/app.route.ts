import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { GetExampleComponent } from './components/get-example/get-example.component';
import { ArtistComponent } from './components/artist/artist.component';

export const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'search', component: SearchComponent },
    { path: 'artist/:id', component: ArtistComponent },
    { path: 'get-petition-example', component: GetExampleComponent },
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];
