import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';  // Importar HttpClientModule
import { IonicStorageModule } from '@ionic/storage-angular';  // Importar IonicStorageModule
import { SQLite } from '@ionic-native/sqlite/ngx';  // Importar SQLite

import { MiModalComponent } from './mi-modal-component/mi-modal-component.component';  // Asegúrate de que la ruta es correcta

@NgModule({
  declarations: [
    AppComponent,
    MiModalComponent  // Declaramos el componente modal aquí
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,  // Incluir HttpClientModule en imports
    IonicStorageModule.forRoot(),  // Inicializar el módulo de Storage
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SQLite  // Incluir SQLite en providers
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Añadimos el esquema para componentes personalizados
})
export class AppModule {}
