import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private storage: Storage) {}

  async canActivate(): Promise<boolean> {
    const username = await this.storage.get('username');  // Verificar si el usuario está en Storage
    if (username) {
      return true;  // Permitir el acceso si está autenticado
    } else {
      this.router.navigate(['/login']);  // Redirigir al login si no está autenticado
      return false;
    }
  }
}
