import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.page.html',
  styleUrls: ['./crear-cuenta.page.scss'],
})
export class CrearCuentaPage {
  username: string = '';         // Inicializa con una cadena vacía
  password: string = '';         // Inicializa con una cadena vacía
  confirmPassword: string = '';  // Inicializa con una cadena vacía

  constructor(private navCtrl: NavController) {}

  onCreateAccount() {
    if (this.password === this.confirmPassword) {
      // Aquí va la lógica para crear una cuenta
      console.log('Cuenta creada con:', this.username, this.password);
      this.navCtrl.navigateRoot('/login');
    } else {
      console.error('Las contraseñas no coinciden');
    }
  }
}
