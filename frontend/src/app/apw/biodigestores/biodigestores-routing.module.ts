import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BiodigestoresComponent } from './biodigestores.component';

const routes: Routes = [{ path: '', component: BiodigestoresComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BiodigestoresRoutingModule { }
