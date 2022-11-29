import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { IsAuthGuard } from './guards/is-auth.guard';

const routes: Routes = [
  { path: '', canActivate:[AuthGuard],  loadChildren: () => import('./apw/apw.module').then(m => m.ApwModule) },
  { path: 'login', canActivate:[IsAuthGuard], loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: '**', loadChildren: () => import('./error404/error404.module').then(m => m.Error404Module) },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
