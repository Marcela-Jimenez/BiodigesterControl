import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApwComponent } from './apw.component';

const routes: Routes = [
  {
    path: '', component: ApwComponent,
    children: [
      { path: '', loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule) },
      { path: 'biodigestores', loadChildren: () => import('./biodigestores/biodigestores.module').then(m => m.BiodigestoresModule) },
      { path: 'reportes', loadChildren: () => import('./reportes/reportes.module').then(m => m.ReportesModule) },
      { path: 'registro', loadChildren: () => import('./registro/registro.module').then(m => m.RegistroModule) }

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApwRoutingModule { }
