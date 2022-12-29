import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesApp } from 'src/app/constants';
import { AssignmentsComponent } from './assignments.component';

const routes: Routes = [
  {
    path: RoutesApp.root,
    component: AssignmentsComponent,
  },
  {
    path: RoutesApp.assignmentRegister,
    loadChildren: () =>
      import('./assignment-register').then((m) => m.AssignmentRegisterModule),
  },
  // {
  //   path: RoutesApp.employees,
  //   loadChildren: () => import('./employees').then((m) => m.EmployeesModule),
  // },
  { path: '**', redirectTo: RoutesApp.root, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignmentsRoutingModule {}
