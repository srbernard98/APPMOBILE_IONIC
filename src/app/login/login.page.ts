import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor() {}

  onSubmit() {
    // Aquí se puede añadir la lógica para manejar el inicio de sesión
    console.log('Iniciando sesión con', this.email, this.password);
  }

  resetPassword() {
    // Lógica para resetear la contraseña
    console.log('Reset Password');
  }

  newUserAccount() {
    // Lógica para crear una nueva cuenta de usuario
    console.log('New User Account');
  }
}
