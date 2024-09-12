import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { ModalController, AnimationController } from '@ionic/angular';
import * as $ from 'jquery'; // validaciones
import { MiModalComponent } from '../mi-modal-component/mi-modal-component.component'; // Importamos el componente del modal

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  ngForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private modalController: ModalController, // Inyectamos ModalController
    private animationCtrl: AnimationController // Inyectamos AnimationController
  ) {}

  ngOnInit() {
    this.ngForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator.bind(this)]],
    });
  }

  // Función que se ejecuta al hacer clic en Iniciar Sesión
  async onSubmit() {
    // Validación usando JQuery
    const usuarioValue = $('#usuario').val();
    const passwordValue = $('#password').val();

    if (typeof usuarioValue === 'string' && usuarioValue.length === 0 ||
        typeof passwordValue === 'string' && passwordValue.length === 0) {
      this.presentModal('Todos los campos son obligatorios.');
      return;
    }

    if (this.ngForm.valid) {
      // Reproducir animación
      this.playAnimation();

      // Mostrar modal de "Usuario creado"
      await this.presentModal('Usuario creado exitosamente.');

      // Redirigir a la portada después de mostrar el modal
      const navigationExtras: NavigationExtras = {
        state: { user: this.ngForm.value },
      };
      this.router.navigate(['/portada'], navigationExtras);
    } else {
      // Mostrar modal si los datos son incorrectos
      this.presentModal('Correo o contraseña incorrectos. Revisa los campos e inténtalo de nuevo.');
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

  // Validador de la contraseña
  passwordValidator(control: any): { [key: string]: boolean } | null {
    const password = control.value;
    if (!this.isPasswordValid(password)) {
      return { invalidPassword: true };
    }
    return null;
  }

  // Método para validar que la contraseña cumple con los requisitos
  isPasswordValid(password: string): boolean {
    const hasFourNumbers = /(?=(.*\d){4})/;
    const hasThreeSpecialChars = /(?=(.[!@#$%^&()\-_=+{};:,<.>]){3})/;
    const hasOneUpperCase = /(?=.*[A-Z])/;

    return hasFourNumbers.test(password) && hasThreeSpecialChars.test(password) && hasOneUpperCase.test(password);
  }

  // Función para mostrar un modal
  async presentModal(message: string) {
    const modal = await this.modalController.create({
      component: MiModalComponent, // Usamos el componente directamente, no una cadena
      cssClass: 'my-custom-class',
      componentProps: {
        message: message
      }
    });
    return await modal.present();
  }

  // Función para reproducir animación
  playAnimation() {
    const buttonElement = document.querySelector('.login-button');
    if (buttonElement) {
      const animation = this.animationCtrl.create()
        .addElement(buttonElement)
        .duration(1500)
        .fromTo('opacity', '0', '1')
        .fromTo('transform', 'scale(0.5)', 'scale(1)');

      animation.play();
    }
  }
}
