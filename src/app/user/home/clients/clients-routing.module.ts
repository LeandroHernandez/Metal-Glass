import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesApp } from 'src/app/constants';
import { ClientsComponent } from './clients.component';

const routes: Routes = [
  {
    path: RoutesApp.root,
    component: ClientsComponent,
  },
  {
    path: RoutesApp.clientRegister,
    loadChildren: () =>
      import('./components/client-register').then(
        (m) => m.ClientRegisterModule
      ),
  },
  {
    path: RoutesApp.clientView,
    loadChildren: () =>
      import('./components/client-view').then((m) => m.ClientViewModule),
  },
  { path: '**', redirectTo: RoutesApp.root, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
