import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesApp } from '../constants';
import { EmployeeAuthGuard } from './auth/employee-auth.guard';
import { EmployeeComponent } from './employee.component';

const routes: Routes = [
  {
    path: RoutesApp.home,
    redirectTo: RoutesApp.auth,
    pathMatch: 'full',
  },
  {
    path: RoutesApp.auth,
    loadChildren: () => import('./auth').then((m) => m.AuthModule),
  },
  {
    canActivate: [EmployeeAuthGuard],
    canLoad: [EmployeeAuthGuard],
    path: RoutesApp.home,
    loadChildren: () => import('./home').then((m) => m.HomeModule),
  },
  { path: '**', redirectTo: RoutesApp.home, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
