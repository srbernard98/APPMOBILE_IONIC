import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';  // Importar HttpClient
import { Storage } from '@ionic/storage-angular';  // Importar Storage de Ionic

@Component({
  selector: 'app-portada',
  templateUrl: './portada.page.html',
  styleUrls: ['./portada.page.scss'],
})
export class PortadaPage implements OnInit {
  currentMonth: string = '';
  dollarValue: number = 0;  // Valor del dólar en pesos chilenos (CLP)
  euroValue: number = 0;  // Valor del euro
  clpAmount: number = 0;  // Monto en pesos chilenos que el usuario ingresa
  usdAmount: number = 0;  // Monto en dólares que el usuario ingresa
  apiKey: string = '57f02538933fb88c23fa3187e222ec59';
  username: string = 'Usuario';  // Almacena el nombre del usuario, por defecto 'Usuario'

  constructor(private router: Router, private http: HttpClient, private storage: Storage) {}

  async ngOnInit() {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { month: 'long' };
    this.currentMonth = date.toLocaleDateString('es-ES', options);

    // Inicializar el almacenamiento
    await this.storage.create();

    // Obtener el nombre del usuario desde Ionic Storage
    this.username = await this.storage.get('username') || 'Usuario';  // Si no existe, se muestra 'Usuario' por defecto

    // Obtener datos de CurrencyLayer en tiempo real y simular algunos valores con JSON-server
    this.getRealTimeRates();
  }

  // Función para obtener los tipos de cambio desde la API de CurrencyLayer
  getRealTimeRates() {
    const apiUrl = `http://api.currencylayer.com/live?access_key=${this.apiKey}&currencies=CLP,USD,EUR&format=1`;

    this.http.get(apiUrl).subscribe((data: any) => {
      if (data.success) {
        this.dollarValue = data.quotes.USDCLP;  // Dólar a peso chileno
        this.euroValue = data.quotes.USDEUR;  // Dólar a euro
      } else {
        console.error('Error al obtener datos de la API de CurrencyLayer', data.error);
      }
    }, error => {
      console.error('Error en la solicitud a la API de CurrencyLayer', error);
    });

    // Obtener datos simulados de JSON-server
    this.http.get('http://localhost:3000/exchangeRates').subscribe((data: any) => {
      console.log('Datos simulados de JSON-server:', data);
    }, error => {
      console.error('Error al obtener datos de JSON-server', error);
    });
  }

  // Función para convertir de pesos chilenos a dólares y euros
  convertFromCLP() {
    if (this.clpAmount > 0 && this.dollarValue > 0) {
      this.usdAmount = this.clpAmount / this.dollarValue;  // Convertir CLP a USD
    }
  }

  // Función para convertir de dólares a pesos chilenos
  convertFromUSD() {
    if (this.usdAmount > 0 && this.dollarValue > 0) {
      this.clpAmount = this.usdAmount * this.dollarValue;  // Convertir USD a CLP
    }
  }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
