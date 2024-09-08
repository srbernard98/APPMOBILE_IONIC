import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.page.html',
  styleUrls: ['./newuser.page.scss'],
})
export class NewUserPage {
  email: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  async onSubmit() {
    if (this.password !== this.confirmPassword) {
      // Mostrar un error si las contraseñas no coinciden
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Aquí puedes añadir la lógica para crear la nueva cuenta

    // Mostrar un pop-up indicando que la cuenta fue creada con éxito
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Cuenta creada con éxito.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // Redirigir a la página de login
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }

  cancel() {
    this.router.navigate(['/login']);
  }
}
