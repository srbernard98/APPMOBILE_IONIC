import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-portada',
  templateUrl: './portada.page.html',
  styleUrls: ['./portada.page.scss'],
})
export class PortadaPage {

  currentMonth: string;
  topSpending: { category: string, amount: number }[] = [];
  monthlyBudget: { budget: string, amount: number }[] = [];

  // Datos del gráfico
  doughnutChartLabels: string[] = ['Alimentación', 'Transporte', 'Entretenimiento'];
  doughnutChartData: number[] = [150, 100, 50]; // Valores iniciales
  doughnutChartType: string = 'doughnut';
  chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(private navCtrl: NavController) {
    const date = new Date();
    this.currentMonth = date.toLocaleString('default', { month: 'long' });

    // Inicialización de las variables con datos de ejemplo
    this.topSpending = [
      { category: 'Alimentación', amount: 150 },
      { category: 'Transporte', amount: 100 },
      { category: 'Entretenimiento', amount: 50 }
    ];

    this.monthlyBudget = [
      { budget: 'Presupuesto mensual de alimentación', amount: 200 },
      { budget: 'Presupuesto mensual de transporte', amount: 120 }
    ];
  }

  goToLogin() {
    this.navCtrl.navigateRoot('/login');
  }

  onSubmit() {
    console.log('Formulario enviado');
  }
}
