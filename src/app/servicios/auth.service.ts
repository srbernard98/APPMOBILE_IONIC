import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiURL = 'https://reqres.in/api'; //

  constructor(private http: HttpClient) {}

  // Función para enviar la solicitud de restablecimiento de contraseña
  resetPassword(username: string): Observable<any> {
    const body = { email: username };  // La API espera un campo "email"
    return this.http.post(`${this.apiURL}/reset-password`, body);
  }
}
