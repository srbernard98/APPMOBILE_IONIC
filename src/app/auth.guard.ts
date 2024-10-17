import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private storage: Storage) {}

  // Método que asegura que el almacenamiento esté inicializado antes de acceder a los datos
  private async initializeStorage(): Promise<void> {
    try {
      await this.storage.create();  // Crear o inicializar el Storage si no está listo
    } catch (error) {
      console.error('Error inicializando el Storage:', error);
    }
  }

  async canActivate(): Promise<boolean> {
    await this.initializeStorage();  // Asegurar que el Storage esté inicializado

    try {
      const username = await this.storage.get('username');  // Verificar si el usuario está en Storage

      if (username) {
        return true;  // Permitir el acceso si está autenticado
      } else {
        this.router.navigate(['/login']);  // Redirigir al login si no está autenticado
        return false;
      }

    } catch (error) {
      console.error('Error obteniendo el username del Storage:', error);
      this.router.navigate(['/login']);  // Redirigir al login en caso de error
      return false;
    }
  }
}
