import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewUserPage } from './newuser.page';

const routes: Routes = [
  {
    path: '',
    component: NewUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewUserPageRoutingModule {}
