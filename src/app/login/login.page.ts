import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  ngForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    this.ngForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator.bind(this)]],
    });
  }

  // Función que se ejecuta al hacer clic en Iniciar Sesión
  onSubmit() {
    if (this.ngForm.valid) {
      // Se redirige a la portada con los datos del usuario
      const navigationExtras: NavigationExtras = {
        state: { user: this.ngForm.value },
      };
      this.router.navigate(['/portada'], navigationExtras);
    } else {
      // Mostrar alerta si los datos son incorrectos
      alert('Correo o contraseña incorrectos. Revisa los campos e inténtalo de nuevo.');
      console.error('Formulario inválido');
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

  // Validador de la contraseña
  passwordValidator(control: any): { [key: string]: boolean } | null {
    const password = control.value;
    if (!this.isPasswordValid(password)) {
      return { invalidPassword: true };
    }
    return null;
  }

  // Método para validar que la contraseña cumple con los requisitos
  isPasswordValid(password: string): boolean {
    const hasFourNumbers = /(?=(.*\d){4})/;
    const hasThreeSpecialChars = /(?=(.[!@#$%^&()\-_=+{};:,<.>]){3})/;
    const hasOneUpperCase = /(?=.*[A-Z])/;

    return hasFourNumbers.test(password) && hasThreeSpecialChars.test(password) && hasOneUpperCase.test(password);
  }
}
