import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.page.html',
  styleUrls: ['./newuser.page.scss'],
})
export class NewUserPage {
  email: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Validar la contraseña con las reglas definidas (opcional)
    if (!this.isPasswordValid(this.password)) {
      alert('La contraseña debe tener al menos 4 números, 3 caracteres especiales y 1 letra mayúscula.');
      return;
    }

    // Obtener la lista actual de usuarios desde localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Agregar el nuevo usuario
    users.push({ email: this.email, username: this.username, password: this.password });

    // Guardar la lista actualizada de usuarios en localStorage
    localStorage.setItem('users', JSON.stringify(users));
    console.log(users);

    alert('Usuario registrado exitosamente');
    this.router.navigate(['/login']);
  }

  // Función para validar la contraseña
  isPasswordValid(password: string): boolean {
    const hasFourNumbers = /(?=(.*\d){4})/;         // Al menos 4 dígitos
    const hasThreeSpecialChars = /(?=(.*[!@#$%^&*()\-_=+{};:,<.>]){3})/; // Al menos 3 caracteres especiales
    const hasOneUpperCase = /(?=.*[A-Z])/;          // Al menos 1 letra mayúscula

    return hasFourNumbers.test(password) && hasThreeSpecialChars.test(password) && hasOneUpperCase.test(password);
  }

  cancel() {
    this.router.navigate(['/login']);
  }
}
