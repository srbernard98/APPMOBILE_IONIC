import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    // Obtener la lista de usuarios desde localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Verificar si el usuario y la contraseña son correctos
    const user = users.find((user: any) => user.email === this.email && user.password === this.password);

    if (user) {
      console.log('Inicio de sesión exitoso');
      this.router.navigate(['/fundfloe']);
    } else {
      console.error('Correo o contraseña incorrectos');
      alert('Correo o contraseña incorrectos');
    }
  }

  resetPassword() {
    console.log('Reset Password');
    this.router.navigate(['/resetpass']);
  }

  newUserAccount() {
    console.log('New User Account');
    this.router.navigate(['/newuser']);
  }

  // Función para validar la contraseña
  isPasswordValid(password: string): boolean {
    const hasFourNumbers = /(?=(.*\d){4})/;         // Al menos 4 dígitos
    const hasThreeSpecialChars = /(?=(.*[!@#$%^&*()\-_=+{};:,<.>]){3})/; // Al menos 3 caracteres especiales
    const hasOneUpperCase = /(?=.*[A-Z])/;          // Al menos 1 letra mayúscula

    return hasFourNumbers.test(password) && hasThreeSpecialChars.test(password) && hasOneUpperCase.test(password);
  }
}
