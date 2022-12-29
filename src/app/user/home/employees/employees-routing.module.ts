import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesApp } from 'src/app/constants';
import { EmployeesComponent } from './employees.component';

const routes: Routes = [
  {
    path: RoutesApp.root,
    component: EmployeesComponent,
  },
  {
    path: RoutesApp.employeeView,
    loadChildren: () =>
      import('./components/employee-view').then((m) => m.EmployeeViewModule),
  },
  {
    path: RoutesApp.employeeRegister,
    loadChildren: () =>
      import('./components/employee-register').then(
        (m) => m.EmployeeRegisterModule
      ),
  },
  { path: '**', redirectTo: RoutesApp.root, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeesRoutingModule {}
