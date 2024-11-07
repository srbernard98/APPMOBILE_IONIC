import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'newuser', loadChildren: () => import('./newuser/newuser.module').then(m => m.NewUserPageModule) },
  { path: 'resetpass', loadChildren: () => import('./resetpass/resetpass.module').then(m => m.ResetPassPageModule) },
  { path: 'fundfloe', loadChildren: () => import('./fundfloe/fundfloe.module').then(m => m.FundfloePageModule) },

  // Rutas protegidas con AuthGuard
  { path: 'portada', loadChildren: () => import('./portada/portada.module').then(m => m.PortadaPageModule), canActivate: [AuthGuard] },
  { path: 'gastos', loadChildren: () => import('./gastos/gastos.module').then(m => m.GastosPageModule), canActivate: [AuthGuard] },
  { path: 'ingresos', loadChildren: () => import('./ingresos/ingresos.module').then(m => m.IngresosPageModule), canActivate: [AuthGuard] },

  // Rutas sin protección
  { path: 'maps', loadChildren: () => import('./maps/maps.module').then(m => m.MapsPageModule) },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule) },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
