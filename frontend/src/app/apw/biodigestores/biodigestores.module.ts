import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BiodigestoresRoutingModule } from './biodigestores-routing.module';
import { BiodigestoresComponent } from './biodigestores.component';


@NgModule({
  declarations: [
    BiodigestoresComponent
  ],
  imports: [
    CommonModule,
    BiodigestoresRoutingModule
  ]
})
export class BiodigestoresModule { }
