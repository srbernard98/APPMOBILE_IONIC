import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-portada',
  templateUrl: './portada.page.html',
  styleUrls: ['./portada.page.scss'],
})
export class PortadaPage implements OnInit {

  currentMonth: string;
  topSpending: { category: string, amount: number }[] = [];
  monthlyBudget: { budget: string, amount: number }[] = [];

  constructor(private navCtrl: NavController) {
    // Inicialización del mes en el constructor
    const date = new Date();
    this.currentMonth = date.toLocaleString('es-ES', { month: 'long' }).charAt(0).toUpperCase() +
                        date.toLocaleString('es-ES', { month: 'long' }).slice(1);
  }

  // Inicializamos las variables en ngOnInit
  ngOnInit() {
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

  // Función para agregar una nueva categoría de gasto
  addCategory() {
    this.topSpending.push({ category: 'Nuevo gasto', amount: 0 });
  }

  // Función para eliminar una categoría de gasto
  removeCategory(index: number) {
    if (index > -1) {
      this.topSpending.splice(index, 1);
    }
  }

  // Función para calcular el total de los gastos
  calculateTotal() {
    return this.topSpending.reduce((total, category) => total + Number(category.amount || 0), 0);
  }

  // Navegación a la página de login
  goToLogin() {
    this.navCtrl.navigateRoot('/login');
  }

  // Manejo del envío de formulario
  onSubmit() {
    console.log('Formulario enviado');
  }
}
