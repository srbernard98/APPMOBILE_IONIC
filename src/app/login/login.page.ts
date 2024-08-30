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
      this.errorMessage = 'La contraseña debe tener 4 números, 3 caracteres especiales, y 1 mayúscula.';
      return;
    }

    // Aquí puedes implementar la lógica para el login exitoso sin validación en base de datos
    this.showSuccessAlert();
  }

  isPasswordValid(password: string): boolean {
    const hasNumber = /[0-9]{4}/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasCharacter = /[!@#$%^&*(),.?":{}|<>]{3}/.test(password); // Ajusta los caracteres especiales según sea necesario
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
