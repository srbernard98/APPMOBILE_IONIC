import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.page.html',
  styleUrls: ['./ingresos.page.scss'],
})
export class IngresosPage implements OnInit {
  currentMonth: string = '';
  incomes: { description: string, amount: number }[] = [];
  totalIncome: number = 0;

  // Variables para el nuevo ingreso
  newIncomeDescription: string = '';
  newIncomeAmount: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { month: 'long' };
    this.currentMonth = date.toLocaleDateString('es-ES', options);
    this.calculateTotalIncome();
  }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }

  logout() {
    this.router.navigate(['/login']);
  }

  // Función para agregar un nuevo ingreso
  addIncome() {
    if (this.newIncomeDescription && this.newIncomeAmount > 0) {
      this.incomes.push({
        description: this.newIncomeDescription,
        amount: this.newIncomeAmount,
      });

      this.calculateTotalIncome();

      // Limpiar los campos después de agregar el ingreso
      this.newIncomeDescription = '';
      this.newIncomeAmount = 0;
    }
  }

  // Función para eliminar un ingreso
  removeIncome(index: number) {
    this.incomes.splice(index, 1);
    this.calculateTotalIncome();
  }

  // Función para calcular el total de ingresos
  calculateTotalIncome() {
    this.totalIncome = this.incomes.reduce((sum, income) => sum + (income.amount || 0), 0);
  }
}
