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
    // Inicializa el formulario en el ciclo de vida OnInit
    this.ngForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator.bind(this)]],
    });
  }

  onSubmit() {
    if (this.ngForm.valid) {
      // Simular inicio de sesión exitoso
      const navigationExtras: NavigationExtras = {
        state: { user: this.ngForm.value },
      };

      // Navegar a la página principal con los datos del usuario
      this.router.navigate(['/fundfloe'], navigationExtras);
    } else {
      alert('Correo o contraseña incorrectos');
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

  // Validación de la contraseña
  passwordValidator(control: any): { [key: string]: boolean } | null {
    const password = control.value;
    if (!this.isPasswordValid(password)) {
      return { invalidPassword: true };
    }
    return null;
  }

  // Función para validar la contraseña
  isPasswordValid(password: string): boolean {
    const hasFourNumbers = /(?=(.*\d){4})/;         // Al menos 4 dígitos
    const hasThreeSpecialChars = /(?=(.*[!@#$%^&*()\-_=+{};:,<.>]){3})/; // Al menos 3 caracteres especiales
    const hasOneUpperCase = /(?=.*[A-Z])/;          // Al menos 1 letra mayúscula

    return hasFourNumbers.test(password) && hasThreeSpecialChars.test(password) && hasOneUpperCase.test(password);
  }
}
