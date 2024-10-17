import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResetPassPage } from './resetpass.page';  // Corregir el nombre aquí

const routes: Routes = [
  {
    path: '',
    component: ResetPassPage  // Corregir el nombre aquí
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetPassPageRoutingModule {}  // Corregir el nombre aquí
