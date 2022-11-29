import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BiodigestoresRoutingModule } from './biodigestores-routing.module';
import { BiodigestoresComponent } from './biodigestores.component';
import { BiodigesterService } from 'src/app/api/services';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    BiodigestoresComponent
  ],
  imports: [
    CommonModule,
    BiodigestoresRoutingModule,
    HttpClientModule
  ],
  providers:[BiodigesterService]
})
export class BiodigestoresModule { }
