import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesApp } from 'src/app/constants';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  {
    path: RoutesApp.root,
    component: ProductsComponent,
  },
  {
    path: RoutesApp.productView,
    loadChildren: () =>
      import('./components/product-view').then((m) => m.ProductViewModule),
  },
  {
    path: RoutesApp.productRegister,
    loadChildren: () =>
      import('./components/product-register').then(
        (m) => m.ProductRegisterModule
      ),
  },
  { path: '**', redirectTo: RoutesApp.root, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
