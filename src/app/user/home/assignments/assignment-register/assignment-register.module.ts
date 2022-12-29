import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoutesApp } from 'src/app/constants';
import { AssignmentRegisterComponent } from './assignment-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSelectModule } from 'ng-zorro-antd/select';

const routes: Routes = [
  { path: RoutesApp.root, component: AssignmentRegisterComponent },
];

@NgModule({
  declarations: [AssignmentRegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NzInputModule,
    NzFormModule,
    NzButtonModule,
    NzGridModule,
    NzCardModule,
    NzDividerModule,
    NzSelectModule,
  ],
})
export class AssignmentRegisterModule {}
