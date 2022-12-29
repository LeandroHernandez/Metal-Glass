import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesApp } from '../constants';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  // {
  //   path: RoutesApp.root,
  //   component: UserComponent,
  // },
  {
    path: RoutesApp.root,
    redirectTo: RoutesApp.home,
    pathMatch: 'full',
  },
  {
    path: RoutesApp.auth,
    loadChildren: () => import('./auth').then((m) => m.AuthModule),
  },
  {
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    path: RoutesApp.home,
    loadChildren: () => import('./home').then((m) => m.HomeModule),
  },
  { path: '**', redirectTo: RoutesApp.home, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
