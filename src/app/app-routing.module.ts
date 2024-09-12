import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'newuser', loadChildren: () => import('./newuser/newuser.module').then(m => m.NewUserPageModule) },
  { path: 'resetpass', loadChildren: () => import('./resetpass/resetpass.module').then(m => m.ResetpassPageModule) },
  { path: 'fundfloe', loadChildren: () => import('./fundfloe/fundfloe.module').then(m => m.FundfloePageModule) },
  { path: 'portada', loadChildren: () => import('./portada/portada.module').then(m => m.PortadaPageModule) }, // Ruta portada

  // Agrega las rutas para Gastos e Ingresos
  { path: 'gastos', loadChildren: () => import('./gastos/gastos.module').then(m => m.GastosPageModule) },  // Ruta gastos
  { path: 'ingresos', loadChildren: () => import('./ingresos/ingresos.module').then(m => m.IngresosPageModule) },  // Ruta ingresos

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
