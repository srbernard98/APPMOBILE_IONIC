import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.page.html',
  styleUrls: ['./resetpass.page.scss'],
})
export class ResetPassPage {
  username: string = '';

  constructor(private router: Router) {}

  resetPassword() {
    // Lógica para restablecer la contraseña
    console.log('Restableciendo contraseña para:', this.username);
  }

  // Definir la función cancel para redirigir al login
  cancel() {
    // Redirige al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }
}
