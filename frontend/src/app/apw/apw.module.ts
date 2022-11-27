import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApwRoutingModule } from './apw-routing.module';
import { ApwComponent } from './apw.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    ApwComponent,
    NavbarComponent
  ],
  imports: [
        CommonModule,
    ApwRoutingModule
  ],
  bootstrap:[ApwComponent]
})
export class ApwModule { }
