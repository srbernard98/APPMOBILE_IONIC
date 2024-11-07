import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-mi-modal-component',
  templateUrl: './mi-modal-component.component.html', // Ruta corregida para el archivo HTML
})
export class MiModalComponent {;
  @Input() message: string = ''; // Recibe el mensaje que se mostrará en el modal

  constructor(private modalController: ModalController) {}

  // Función para cerrar el modal
  dismiss() {
    this.modalController.dismiss();
  }
}
