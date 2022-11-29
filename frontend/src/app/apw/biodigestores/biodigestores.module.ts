import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BiodigestoresRoutingModule } from './biodigestores-routing.module';
import { BiodigestoresComponent } from './biodigestores.component';
import { BiodigesterService } from 'src/app/api/services';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    BiodigestoresComponent
  ],
  imports: [
    CommonModule,
    BiodigestoresRoutingModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers:[BiodigesterService]
})
export class BiodigestoresModule { }
