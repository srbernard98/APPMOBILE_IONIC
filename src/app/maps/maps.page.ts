/// <reference types="@types/google.maps" />

import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements AfterViewInit {
  @ViewChild('mapElement', { static: false }) mapElement!: ElementRef;  // Referencia al elemento HTML del mapa
  map!: GoogleMap;  // Variable para almacenar el mapa

  constructor(private geolocation: Geolocation) {}

  async ngAfterViewInit() {
    try {
      // Obtener la ubicación actual del usuario
      const position = await this.geolocation.getCurrentPosition();

      // Crear el mapa usando el API Key y centrado en la ubicación del usuario
      this.map = await GoogleMap.create({
        id: 'my-map',  // ID único requerido
        element: this.mapElement.nativeElement,
        apiKey: environment.googleMapsApiKey,
        config: {
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          zoom: 15
        }
      });

      // Llamar a la función para buscar bancos cercanos
      this.buscarBancos();
    } catch (error) {
      console.error('Error al inicializar el mapa o la geolocalización:', error);
    }
  }

  async buscarBancos() {
    try {
      // Obtener la ubicación actual
      const position = await this.geolocation.getCurrentPosition();
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // Construir la URL para la API de Google Places con la búsqueda de bancos cercanos
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=bank&key=${environment.googleMapsApiKey}`;

      // Realizar la petición a la API de Google Places
      const response = await fetch(url);
      const data = await response.json();

      // Agregar un marcador en el mapa para cada banco encontrado
      data.results.forEach((banco: any) => {
        this.map.addMarker({
          coordinate: {  // Cambiado de position a coordinate
            lat: banco.geometry.location.lat,
            lng: banco.geometry.location.lng
          },
          title: banco.name
        });
      });
    } catch (error) {
      console.error('Error al buscar bancos cercanos:', error);
    }
  }
}
