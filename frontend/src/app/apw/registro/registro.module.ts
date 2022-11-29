import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BiodigesterService, RolService } from 'src/app/api/services';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserService } from 'src/app/api/services/user.service';


@NgModule({
  declarations: [
    RegistroComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    RegistroRoutingModule
  ],
  providers: [BiodigesterService, RolService, UserService] 
})
export class RegistroModule { }
