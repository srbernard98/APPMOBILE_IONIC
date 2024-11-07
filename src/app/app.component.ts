import { Component } from '@angular/core';
import { DatabaseService } from './servicios/database.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private databaseService: DatabaseService) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.databaseService.initializeDatabase();
  }
}
