import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BiodigestorRoutingModule } from './biodigestor-routing.module';
import { BiodigestorComponent } from './biodigestor.component';
import { HttpClientModule } from '@angular/common/http';
import { BiodigesterService } from 'src/app/api/services';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    BiodigestorComponent
  ],
  imports: [
    CommonModule,
    BiodigestorRoutingModule,
    NgxChartsModule,
    FormsModule,
    HttpClientModule
  ],
  providers:[BiodigesterService]
})
export class BiodigestorModule { }
