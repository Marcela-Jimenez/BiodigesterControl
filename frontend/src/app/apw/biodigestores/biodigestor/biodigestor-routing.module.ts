import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BiodigestorComponent } from './biodigestor.component';

const routes: Routes = [{ path: '', component: BiodigestorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BiodigestorRoutingModule {
  
 }
