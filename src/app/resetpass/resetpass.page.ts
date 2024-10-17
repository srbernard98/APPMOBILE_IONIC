import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';  // Importa HttpClient para enviar la solicitud

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.page.html',
  styleUrls: ['./resetpass.page.scss'],
})
export class ResetpassPage {
  email: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private http: HttpClient // Inyectamos HttpClient para las solicitudes HTTP
  ) {}

  async onConfirm() {
    if (!this.email) {
      // Si el campo de correo está vacío, mostramos una alerta de error
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, ingrese su correo electrónico',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    // Aquí enviarías el correo a tu servicio o API
    // Ejemplo básico de solicitud POST a una API ficticia
    this.http.post('https://api.tuapp.com/reset-password', { email: this.email })
      .subscribe(async response => {
        // Mostrar alerta de éxito si la solicitud fue exitosa
        const alert = await this.alertController.create({
          header: 'Éxito',
          message: 'Se ha enviado un enlace para restablecer tu contraseña a tu correo.',
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
      }, async error => {
        // Mostrar alerta de error si la solicitud falla
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Hubo un problema al restablecer la contraseña. Por favor, inténtalo de nuevo.',
          buttons: ['OK'],
        });
        await alert.present();
      });
  }

  cancel() {
    this.router.navigate(['/login']);
  }
}
