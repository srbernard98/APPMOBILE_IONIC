import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  username: string = '';
  userEmail: string = '';
  profilePicture: string = 'assets/avatar-default.png';

  constructor(
    private storage: Storage,
    private router: Router,
    private actionSheetController: ActionSheetController
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.username = await this.storage.get('username') || 'Usuario';
    this.userEmail = await this.storage.get('userEmail') || 'correo@ejemplo.com';
    this.profilePicture = await this.storage.get('profilePicture') || 'assets/avatar-default.png';
  }

  async presentPhotoOptions() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Foto de Perfil',
      buttons: [
        {
          text: 'Elegir de Galería',
          icon: 'image',
          handler: () => {
            this.selectImage(CameraSource.Photos);
          }
        },
        {
          text: 'Tomar Foto',
          icon: 'camera',
          handler: () => {
            this.selectImage(CameraSource.Camera);
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  async selectImage(source: CameraSource) {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: source
      });

      this.profilePicture = image.webPath || 'assets/avatar-default.png';
      await this.storage.set('profilePicture', this.profilePicture);
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
    }
  }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
