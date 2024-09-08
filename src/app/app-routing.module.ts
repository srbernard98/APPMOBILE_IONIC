import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'newuser', loadChildren: () => import('./newuser/newuser.module').then(m => m.NewUserPageModule) },
  { path: 'resetpass', loadChildren: () => import('./resetpass/resetpass.module').then(m => m.ResetpassPageModule) },
  {
    path: 'fundfloe',
    loadChildren: () => import('./fundfloe/fundfloe.module').then( m => m.FundfloePageModule)
  },
  // otras rutas...
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
