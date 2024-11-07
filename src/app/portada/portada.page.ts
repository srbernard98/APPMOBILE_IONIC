import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-portada',
  templateUrl: './portada.page.html',
  styleUrls: ['./portada.page.scss'],
})
export class PortadaPage implements OnInit {
  currentMonth: string = '';
  dollarValue: number = 0;
  euroValue: number = 0;
  clpAmount: number = 0;
  usdAmount: number = 0;
  apiKey: string = '57f02538933fb88c23fa3187e222ec59';
  username: string = 'Usuario';

  totalIngresos: number = 0;
  totalGastos: number = 0;
  balanceMensual: number = 0;

  constructor(private router: Router, private http: HttpClient, private storage: Storage) {}

  async ngOnInit() {
    // Verificar si el usuario está autenticado
    const isAuthenticated = await this.storage.get('isAuthenticated');
    if (!isAuthenticated) {
      this.router.navigate(['/login']); // Redirige al login si no está autenticado
      return;
    }

    // Cargar datos del usuario
    this.username = await this.storage.get('username') || 'Usuario';

    // Inicializar otros datos
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { month: 'long' };
    this.currentMonth = date.toLocaleDateString('es-ES', options);

    this.getRealTimeRates();
  }

  async ionViewWillEnter() {
    this.totalIngresos = await this.storage.get('totalIngresos') || 0;
    this.totalGastos = await this.storage.get('totalGastos') || 0;
    this.balanceMensual = this.totalIngresos - this.totalGastos;
  }

  getRealTimeRates() {
    const apiUrl = `http://api.currencylayer.com/live?access_key=${this.apiKey}&currencies=CLP,USD,EUR&format=1`;

    this.http.get(apiUrl).subscribe((data: any) => {
      if (data.success) {
        this.dollarValue = data.quotes.USDCLP;
        this.euroValue = data.quotes.USDEUR;
      } else {
        console.error('Error al obtener datos de la API de CurrencyLayer', data.error);
      }
    }, error => {
      console.error('Error en la solicitud a la API de CurrencyLayer', error);
    });
  }

  convertFromCLP() {
    if (this.clpAmount > 0 && this.dollarValue > 0) {
      this.usdAmount = this.clpAmount / this.dollarValue;
    }
  }

  convertFromUSD() {
    if (this.usdAmount > 0 && this.dollarValue > 0) {
      this.clpAmount = this.usdAmount * this.dollarValue;
    }
  }

  // Función específica para navegar a la página de Maps
  navigateToMaps() {
    this.router.navigate(['/maps']);
  }

  // Función específica para navegar a la página de Profile
  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  // Navegación genérica a una página dada
  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }

  logout() {
    // Al hacer logout, elimina el estado de autenticación
    this.storage.set('isAuthenticated', false);
    this.router.navigate(['/login']);
  }
}
