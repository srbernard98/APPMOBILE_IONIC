import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FundfloePage } from './fundfloe.page';

const routes: Routes = [
  {
    path: '',
    component: FundfloePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FundfloePageRoutingModule {}
