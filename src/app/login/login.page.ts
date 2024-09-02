import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = ''; // Inicializar como cadena vacía
  password: string = ''; // Inicializar como cadena vacía
  errorMessage: string = ''; // Inicializar como cadena vacía

  constructor(private alertController: AlertController) {}

  onLogin() {
    this.errorMessage = '';

    if (!this.isPasswordValid(this.password)) {
      this.errorMessage = 'La contraseña debe tener al menos 4 números, 3 caracteres especiales, y 1 letra mayúscula.';
      return;
    }

    // Aquí puedes implementar la lógica para el login exitoso sin validación en base de datos
    this.showSuccessAlert();
  }

  isPasswordValid(password: string): boolean {
    // Al menos 4 números
    const hasNumber = (password.match(/[0-9]/g) || []).length >= 4;
    // Al menos 1 letra mayúscula
    const hasUpperCase = /[A-Z]/.test(password);
    // Al menos 3 caracteres especiales
    const hasCharacter = (password.match(/[!@#$%^&*(),.?":{}|<>_-]/g) || []).length >= 3;

    return hasNumber && hasUpperCase && hasCharacter && password.length >= 8;
  }

  async showSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Login Exitoso',
      message: '¡Has iniciado sesión correctamente!',
      buttons: ['OK']
    });

    await alert.present();
  }
}
