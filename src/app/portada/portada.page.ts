import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portada',
  templateUrl: './portada.page.html',
  styleUrls: ['./portada.page.scss'],
})
export class PortadaPage implements OnInit {
  currentMonth: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { month: 'long' };
    this.currentMonth = date.toLocaleDateString('es-ES', options);
  }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }

  logout() {
    // Lógica para cerrar sesión si es necesario (limpiar datos, tokens, etc.)
    this.router.navigate(['/login']); // Redirige al login
  }
}
