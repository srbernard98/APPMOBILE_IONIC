import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresosPage } from './ingresos.page';

const routes: Routes = [
  {
    path: '',
    component: IngresosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresosPageRoutingModule {}
