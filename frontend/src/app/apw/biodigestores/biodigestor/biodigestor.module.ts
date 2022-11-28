import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BiodigestorRoutingModule } from './biodigestor-routing.module';
import { BiodigestorComponent } from './biodigestor.component';


@NgModule({
  declarations: [
    BiodigestorComponent
  ],
  imports: [
    CommonModule,
    BiodigestorRoutingModule
  ]
})
export class BiodigestorModule { }
