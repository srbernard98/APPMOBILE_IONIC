import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';  // Importamos el AuthGuard

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },  // Ruta de redirección al login por defecto
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'newuser', loadChildren: () => import('./newuser/newuser.module').then(m => m.NewUserPageModule) },

  // Corrección del nombre del módulo ResetPassPageModule
  { path: 'resetpass', loadChildren: () => import('./resetpass/resetpass.module').then(m => m.ResetPassPageModule) },

  { path: 'fundfloe', loadChildren: () => import('./fundfloe/fundfloe.module').then(m => m.FundfloePageModule) },

  // Ruta protegida con AuthGuard para la página de inicio
  {
    path: 'portada',
    loadChildren: () => import('./portada/portada.module').then(m => m.PortadaPageModule),
    canActivate: [AuthGuard]  // Protegemos la ruta de portada con AuthGuard
  },

  // Rutas protegidas para Gastos e Ingresos
  {
    path: 'gastos',
    loadChildren: () => import('./gastos/gastos.module').then(m => m.GastosPageModule),
    canActivate: [AuthGuard]  // Protegemos la ruta de gastos
  },
  {
    path: 'ingresos',
    loadChildren: () => import('./ingresos/ingresos.module').then(m => m.IngresosPageModule),
    canActivate: [AuthGuard]  // Protegemos la ruta de ingresos
  },

  // Ruta wildcard para redirigir cualquier ruta inválida al login
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
