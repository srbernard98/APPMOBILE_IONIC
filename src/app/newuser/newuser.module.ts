import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NewUserPageRoutingModule } from './newuser-routing.module';
import { NewUserPage } from './newuser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewUserPageRoutingModule
  ],
  declarations: [NewUserPage]
})
export class NewUserPageModule {}
