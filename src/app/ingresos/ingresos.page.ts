import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.page.html',
  styleUrls: ['./ingresos.page.scss'],
})
export class IngresosPage implements OnInit {
  currentMonth: string = '';
  totalIncomes: number = 0;
  newIncomeDescription: string = '';
  newIncomeAmount: number = 0;
  otherIncome: string = '';
  incomes: Array<{ description: string, amount: number }> = [];

  constructor(private router: Router) {} // Inyectar Router

  ngOnInit() {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { month: 'long' };
    this.currentMonth = date.toLocaleDateString('es-ES', options);
  }

  // Función para la navegación entre páginas
  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }

  // Función para cerrar sesión
  logout() {
    this.router.navigate(['/login']);
  }

  addIncome() {
    const incomeDescription = this.newIncomeDescription === 'Otros' ? this.otherIncome : this.newIncomeDescription;
    if (incomeDescription && this.newIncomeAmount > 0) {
      this.incomes.push({
        description: incomeDescription,
        amount: this.newIncomeAmount,
      });
      this.totalIncomes += this.newIncomeAmount;
      this.resetForm();
    }
  }

  removeIncome(index: number) {
    this.totalIncomes -= this.incomes[index].amount;
    this.incomes.splice(index, 1);
  }

  resetForm() {
    this.newIncomeDescription = '';
    this.newIncomeAmount = 0;
    this.otherIncome = '';
  }
}
