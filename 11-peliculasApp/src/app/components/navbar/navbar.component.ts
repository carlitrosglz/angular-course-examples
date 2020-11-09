import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
    .logo{ width: 30px; }
    .logo-text { font-family: 'Bebas Neue', cursive; font-size: 30px; } `]
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  searchMovie(movie: string): void{
    movie = movie.trim();

    if (movie.length === 0) { return; }

    this.router.navigate(['/search', movie]);
  }

}

