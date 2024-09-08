import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.page.html',
  styleUrls: ['./resetpass.page.scss'],
})
export class ResetpassPage {
  email: string = '';

  constructor(private router: Router, private alertController: AlertController) {}

  async onConfirm() {
    // Aquí puedes agregar la lógica para procesar el correo, por ejemplo, enviarlo a un servicio

    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Contraseña restablecida',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // Redirigir a la página de inicio de sesión
            this.router.navigate(['/login']);
          },
        },
      ],
    });

    await alert.present();
  }
}
