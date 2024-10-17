import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';  // Importamos el AuthGuard

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'newuser', loadChildren: () => import('./newuser/newuser.module').then(m => m.NewUserPageModule) },
  { path: 'resetpass', loadChildren: () => import('./resetpass/resetpass.module').then(m => m.ResetpassPageModule) },
  { path: 'fundfloe', loadChildren: () => import('./fundfloe/fundfloe.module').then(m => m.FundfloePageModule) },

  // Ruta protegida con AuthGuard
  { path: 'portada', loadChildren: () => import('./portada/portada.module').then(m => m.PortadaPageModule), canActivate: [AuthGuard] }, // Ruta portada protegida

  // Rutas para Gastos e Ingresos protegidas con AuthGuard
  { path: 'gastos', loadChildren: () => import('./gastos/gastos.module').then(m => m.GastosPageModule), canActivate: [AuthGuard] },  // Ruta gastos protegida
  { path: 'ingresos', loadChildren: () => import('./ingresos/ingresos.module').then(m => m.IngresosPageModule), canActivate: [AuthGuard] },  // Ruta ingresos protegida

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
