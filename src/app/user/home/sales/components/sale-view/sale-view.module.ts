import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleViewComponent } from './sale-view.component';
import { RouterModule, Routes } from '@angular/router';
import { RoutesApp } from 'src/app/constants';

const routes: Routes = [{ path: RoutesApp.root, component: SaleViewComponent }];

@NgModule({
  declarations: [SaleViewComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SaleViewModule {}
