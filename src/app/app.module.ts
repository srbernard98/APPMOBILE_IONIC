import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';  // Importar HttpClientModule

// Asegúrate de que la ruta es correcta
import { MiModalComponent } from './mi-modal-component/mi-modal-component.component';

@NgModule({
  declarations: [
    AppComponent,
    MiModalComponent // Declaramos el componente modal aquí
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule // Incluir HttpClientModule en imports
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Añadimos el esquema para componentes personalizados
})
export class AppModule {}
