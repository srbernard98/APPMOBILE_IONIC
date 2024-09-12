import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-fundfloe',
  templateUrl: './fundfloe.page.html',
  styleUrls: ['./fundfloe.page.scss'],
})
export class FundfloePage {
  username: string = 'Usuario'; // Por defecto, cambia esto según la lógica de tu app
  icons = [
    { name: 'home', title: 'Inicio' },
    { name: 'settings', title: 'Configuración' },
    { name: 'person', title: 'Perfil' },
    { name: 'notifications', title: 'Notificaciones' },
    { name: 'help-circle', title: 'Ayuda' },
    { name: 'information-circle', title: 'Información' }
  ];

  data: any = {};

  constructor(private router: Router,

    private activeroute: ActivatedRoute,
  )
  {
    this.activeroute.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation && navigation.extras.state && navigation.extras.state) {
        this.data = navigation.extras.state;
      }
    });

  }

  logout() {
    this.router.navigate(['/login']);
  }
}
