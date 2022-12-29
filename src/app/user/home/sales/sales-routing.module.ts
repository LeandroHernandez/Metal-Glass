import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesApp } from 'src/app/constants';
import { SalesComponent } from './sales.component';

const routes: Routes = [
  {
    path: RoutesApp.root,
    component: SalesComponent,
  },
  {
    path: RoutesApp.saleRegister,
    loadChildren: () =>
      import('./components/sale-register').then((m) => m.SaleRegisterModule),
  },
  {
    path: RoutesApp.saleView,
    loadChildren: () =>
      import('./components/sale-view').then((m) => m.SaleViewModule),
  },
  { path: '**', redirectTo: RoutesApp.root, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesRoutingModule {}
