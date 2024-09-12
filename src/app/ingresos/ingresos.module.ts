import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { IngresosPageRoutingModule } from './ingresos-routing.module';
import { IngresosPage } from './ingresos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresosPageRoutingModule
  ],
  declarations: [IngresosPage]
})
export class IngresosPageModule {}
