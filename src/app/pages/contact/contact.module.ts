import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card'


@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    MatCardModule,
    MatIconModule
  ]
})
export class ContactModule { }
