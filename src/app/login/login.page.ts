import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { MiModalComponent } from '../mi-modal-component/mi-modal-component.component';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ngForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private modalController: ModalController,
    private storage: Storage
  ) {}

  async ngOnInit() {
    // Crear el formulario de inicio de sesión con validación de email y contraseña
    this.ngForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    // Inicializar el Storage
    await this.storage.create();
  }

  // Función que se ejecuta al hacer clic en Iniciar Sesión
  async onSubmit() {
    // Verificar que el formulario es válido
    if (this.ngForm.valid) {
      // Guardar el estado de autenticación en Storage
      await this.storage.set('isAuthenticated', true);
      await this.storage.set('username', this.ngForm.value.usuario);

      // Opcional: mostrar modal de bienvenida
      await this.presentModal('Bienvenido a tu app de finanzas.');

      // Redirigir a la página de portada después de iniciar sesión
      const navigationExtras: NavigationExtras = {
        state: { user: this.ngForm.value }
      };
      this.router.navigate(['/portada'], navigationExtras);
    } else {
      // Mostrar modal si los datos son incorrectos
      this.presentModal('Correo o contraseña incorrectos. Revisa los campos e inténtalo de nuevo.');
    }
  }

  // Función para mostrar un modal con un mensaje
  async presentModal(message: string) {
    const modal = await this.modalController.create({
      component: MiModalComponent,
      componentProps: { message: message }
    });
    return await modal.present();
  }

  // Función para resetear la contraseña
  resetPassword() {
    this.router.navigate(['/resetpass']);
  }

  // Función para crear una nueva cuenta de usuario
  newUserAccount() {
    this.router.navigate(['/newuser']);
  }
}
