import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesApp } from 'src/app/constants';
import { TypesOfDocumentsComponent } from './types-of-documents.component';

const routes: Routes = [
  {
    path: RoutesApp.root,
    component: TypesOfDocumentsComponent,
  },
  {
    path: RoutesApp.documentTypeRegister,
    loadChildren: () =>
      import('./type-of-document-register').then(
        (m) => m.TypeOfDocumentRegisterModule
      ),
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
export class TypesOfDocumentsRoutingModule {}
