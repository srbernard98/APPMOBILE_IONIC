import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private dbConnection: SQLiteDBConnection | null = null;

  constructor() { }

  async initializeDatabase() {
    try {
      // Crear la conexión y convertir el resultado a `unknown` antes de `SQLiteDBConnection`
      const connection = (await CapacitorSQLite.createConnection({
        database: 'my_database',
        version: 1,
        encrypted: false,
        mode: 'no-encryption'
      })) as unknown as SQLiteDBConnection;

      this.dbConnection = connection;
      await this.dbConnection.open();

      // Crear la tabla de usuarios manualmente
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT,
          email TEXT UNIQUE,
          income INTEGER DEFAULT 0,
          expenses INTEGER DEFAULT 0
        );
      `;
      await this.dbConnection.execute(createTableQuery);

      // Reiniciar ingresos a 0 si es necesario
      await this.resetIncomes();

    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }

  // Método para eliminar el ingreso de 6 millones si está en la base de datos
  async resetIncomes() {
    if (!this.dbConnection) return;
    try {
      const query = `UPDATE users SET income = 0 WHERE income = 6000000`;
      await this.dbConnection.run(query);
      console.log("Ingresos reiniciados a 0 para usuarios con 6 millones.");
    } catch (error) {
      console.error('Error al reiniciar ingresos:', error);
    }
  }

  async addUser(name: string, email: string) {
    if (!this.dbConnection) return;
    const query = `INSERT INTO users (name, email, income, expenses) VALUES (?, ?, 0, 0)`;
    try {
      await this.dbConnection.run(query, [name, email]);
      console.log("Usuario agregado:", name);
    } catch (error) {
      console.error("Error al agregar usuario:", error);
    }
  }

  // Método para obtener un usuario por correo electrónico
  async getUserByEmail(email: string) {
    if (!this.dbConnection) return null;
    const query = `SELECT * FROM users WHERE email = ?`;
    try {
      const result = await this.dbConnection.query(query, [email]);
      if (result.values && result.values.length > 0) {
        console.log("Usuario encontrado:", result.values[0]);
        return result.values[0];
      }
      console.log("Usuario no encontrado.");
      return null;
    } catch (error) {
      console.error("Error al buscar usuario por email:", error);
      return null;
    }
  }
}
