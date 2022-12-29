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
  // {
  //   path: RoutesApp.logIn,
  //   loadChildren: () => import('./log-in').then((m) => m.LogInModule),
  // },
  { path: '**', redirectTo: RoutesApp.logIn, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
