import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroeComponent } from './components/heroe-detail/heroe-detail.component';
import { SearchComponent } from './components/search/search.component';



/* LISTA DE RUTAS PARA NUESTRA SPA */
const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'heroes', component: HeroesComponent },
    { path: 'heroe/:id', component: HeroeComponent },
    { path: 'search/:text', component: SearchComponent },
    /* esta última ruta es por si no encuentra alguna de las de arriba. Se redirigiría a HOME en ese caso */
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
