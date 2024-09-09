import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fundfloe',
  templateUrl: './fundfloe.page.html',
  styleUrls: ['./fundfloe.page.scss'],
})
export class FundfloePage {
  username: string = 'Usuario'; // Por defecto, cambia esto según la lógica de tu app
  icons = [
    { name: 'home', title: 'Inicio' },
    { name: 'settings', title: 'Configuración' },
    { name: 'person', title: 'Perfil' },
    { name: 'notifications', title: 'Notificaciones' },
    { name: 'help-circle', title: 'Ayuda' },
    { name: 'information-circle', title: 'Información' }
  ];

  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/login']);
  }
}
