import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = ''; // Inicializar como cadena vacía
  password: string = ''; // Inicializar como cadena vacía
  errorMessage: string = ''; // Inicializar como cadena vacía

  constructor(private alertController: AlertController, private navCtrl: NavController) {}

  onLogin() {
    this.errorMessage = '';

    if (!this.isPasswordValid(this.password)) {
      this.errorMessage = 'La contraseña debe tener al menos 4 números, 3 caracteres especiales, y 1 letra mayúscula.';
      return;
    }

    // Mostrar la alerta de éxito y luego navegar a la página Portada
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
      header: '¡Bienvenido a AhorraSmart!',
      message: ' Toma las riendas de tus finanzas.',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.navCtrl.navigateRoot('/portada'); // Navegar a la página Portada después de cerrar la alerta
        }
      }]
    });

    await alert.present();
  }
}
