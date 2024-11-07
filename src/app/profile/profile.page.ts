import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',  
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  username: string = '';
  userEmail: string = '';

  constructor(private storage: Storage, private router: Router) {}

  async ngOnInit() {
    await this.storage.create();
    this.username = await this.storage.get('username') || 'Usuario';
    this.userEmail = await this.storage.get('userEmail') || 'correo@ejemplo.com';
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
