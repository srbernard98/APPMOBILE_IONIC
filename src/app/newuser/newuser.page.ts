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
    // Comprobar si las contraseñas coinciden
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Validar la contraseña con las mismas reglas que en el login
    if (!this.isPasswordValid(this.password)) {
      alert('La contraseña debe tener al menos 3 caracteres, 4 números y 1 mayúscula.');
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

  // Función para validar la contraseña (basada en la validación de login)
  isPasswordValid(password: string): boolean {
    const minLength = password.length >= 3;  // Al menos 3 caracteres
    const hasFourNumbers = (password.match(/\d/g) || []).length >= 4;  // Al menos 4 dígitos
    const hasOneUpperCase = /[A-Z]/.test(password);  // Al menos una mayúscula

    return minLength && hasFourNumbers && hasOneUpperCase;
  }

  cancel() {
    this.router.navigate(['/login']);
  }
}
