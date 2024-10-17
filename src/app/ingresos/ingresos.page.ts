import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router
import { Storage } from '@ionic/storage-angular'; // Importar Storage

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

  constructor(private router: Router, private storage: Storage) {} // Inyectar Router y Storage

  async ngOnInit() {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { month: 'long' };
    this.currentMonth = date.toLocaleDateString('es-ES', options);

    // Inicializar el almacenamiento
    await this.storage.create();

    // Cargar los ingresos totales desde el Storage
    this.totalIncomes = await this.storage.get('totalIngresos') || 0;
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

      // Guardar el total de ingresos en Storage
      this.storage.set('totalIngresos', this.totalIncomes);

      this.resetForm();
    }
  }

  removeIncome(index: number) {
    this.totalIncomes -= this.incomes[index].amount;
    this.incomes.splice(index, 1);

    // Guardar el total de ingresos actualizado en Storage
    this.storage.set('totalIngresos', this.totalIncomes);
  }

  resetForm() {
    this.newIncomeDescription = '';
    this.newIncomeAmount = 0;
    this.otherIncome = '';
  }
}
