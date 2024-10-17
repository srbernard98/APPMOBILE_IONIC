import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Asegúrate de importar Router
import { Storage } from '@ionic/storage-angular';  // Importa Storage

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})
export class GastosPage implements OnInit {
  currentMonth: string = '';
  expenses: { description: string, amount: number }[] = [];
  totalExpenses: number = 0;
  newExpenseDescription: string = '';
  otherExpense: string = ''; // Para manejar el valor cuando el usuario elige "Otro"
  newExpenseAmount: number = 0;

  constructor(private router: Router, private storage: Storage) {} // Inyectar el servicio Router y Storage

  async ngOnInit() {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { month: 'long' };
    this.currentMonth = date.toLocaleDateString('es-ES', options);

    // Inicializar el almacenamiento
    await this.storage.create();

    // Cargar gastos totales desde el Storage
    this.totalExpenses = await this.storage.get('totalGastos') || 0;

    // Calcular el total de los gastos actuales si los hay
    this.calculateTotalExpenses();
  }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]); // Navegar a la página especificada
  }

  logout() {
    this.router.navigate(['/login']); // Redirigir a la página de login
  }

  addExpense() {
    let description = this.newExpenseDescription;

    // Si elige "Otro", usar el valor especificado
    if (description === 'Otro') {
      description = this.otherExpense;
    }

    if (description && this.newExpenseAmount > 0) {
      this.expenses.push({
        description: description,
        amount: this.newExpenseAmount,
      });

      this.calculateTotalExpenses();

      // Limpiar los campos
      this.newExpenseDescription = '';
      this.otherExpense = '';
      this.newExpenseAmount = 0;
    }
  }

  removeExpense(index: number) {
    this.expenses.splice(index, 1);
    this.calculateTotalExpenses();
  }

  calculateTotalExpenses() {
    this.totalExpenses = this.expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);

    // Guardar el total de gastos en Storage
    this.storage.set('totalGastos', this.totalExpenses);
  }
}
