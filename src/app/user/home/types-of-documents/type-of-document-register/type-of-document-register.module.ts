import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeOfDocumentRegisterComponent } from './type-of-document-register.component';
import { RouterModule, Routes } from '@angular/router';
import { RoutesApp } from 'src/app/constants';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';

const routes: Routes = [
  { path: RoutesApp.root, component: TypeOfDocumentRegisterComponent },
];

@NgModule({
  declarations: [TypeOfDocumentRegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NzInputModule,
    NzFormModule,
    NzButtonModule,
    NzGridModule,
    NzCardModule,
  ],
})
export class TypeOfDocumentRegisterModule {}
