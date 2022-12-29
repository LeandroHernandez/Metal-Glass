import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesApp } from 'src/app/constants';
import { HomeComponent } from './home.component';

const routes: Routes = [
  // {
  //   path: RoutesApp.root,
  //   redirectTo: RoutesApp.logIn,
  //   pathMatch: 'full',
  // },
  {
    path: RoutesApp.root,
    component: HomeComponent,
  },
  {
    path: RoutesApp.employees,
    loadChildren: () => import('./employees').then((m) => m.EmployeesModule),
  },
  {
    path: RoutesApp.products,
    loadChildren: () => import('./products').then((m) => m.ProductsModule),
  },
  {
    path: RoutesApp.sales,
    loadChildren: () => import('./sales').then((m) => m.SalesModule),
  },
  // {
  //   path: RoutesApp.quotes,
  //   loadChildren: () => import('./quotes').then((m) => m.QuotesModule),
  // },
  {
    path: RoutesApp.clients,
    loadChildren: () => import('./clients').then((m) => m.ClientsModule),
  },
  {
    path: RoutesApp.assignments,
    loadChildren: () =>
      import('./assignments').then((m) => m.AssignmentsModule),
  },
  {
    path: RoutesApp.documentTypes,
    loadChildren: () =>
      import('./types-of-documents').then((m) => m.TypesOfDocumentsModule),
  },
  { path: '**', redirectTo: RoutesApp.root, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
