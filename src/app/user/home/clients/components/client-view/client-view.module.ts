import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientViewComponent } from './client-view.component';
import { RouterModule, Routes } from '@angular/router';
import { RoutesApp } from 'src/app/constants';

const routes: Routes = [
  { path: RoutesApp.root, component: ClientViewComponent },
];

@NgModule({
  declarations: [ClientViewComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ClientViewModule {}
