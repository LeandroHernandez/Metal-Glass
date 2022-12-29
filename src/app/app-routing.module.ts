import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesApp } from './constants';

const routes: Routes = [
  {
    path: RoutesApp.root,
    // redirectTo: RoutesApp.employee,
    redirectTo: RoutesApp.admin,
    pathMatch: 'full',
  },
  {
    path: RoutesApp.admin,
    loadChildren: () => import('./user').then((m) => m.UserModule),
  },
  {
    path: RoutesApp.employee,
    loadChildren: () => import('./employee').then((m) => m.EmployeeModule),
  },
  // {
  //   canActivate: [AuthGuard],
  //   canLoad: [AuthGuard],
  //   path: RoutesApp.profile,
  //   loadChildren: () => import('./home/profile').then((m) => m.ProfileModule),
  // },
  // { path: '**', redirectTo: RoutesApp.employee, pathMatch: 'full' },
  { path: '**', redirectTo: RoutesApp.admin, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
