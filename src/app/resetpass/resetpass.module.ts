import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ResetPassPageRoutingModule } from './resetpass-routing.module';  // Asegúrate de que el nombre del archivo coincida
import { ResetPassPage } from './resetpass.page';  // Corregir el nombre aquí

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetPassPageRoutingModule  // Corregir el nombre aquí
  ],
  declarations: [ResetPassPage]  // Corregir el nombre aquí
})
export class ResetPassPageModule {}
