import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeViewComponent } from './employee-view.component';
import { RouterModule, Routes } from '@angular/router';
import { RoutesApp } from 'src/app/constants';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { EyeOutline, DeleteOutline } from '@ant-design/icons-angular/icons';

const routes: Routes = [
  { path: RoutesApp.root, component: EmployeeViewComponent },
];

@NgModule({
  declarations: [EmployeeViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzButtonModule,
    NzGridModule,
    NzCardModule,
    NzDividerModule,
    NzCarouselModule,
    NzIconModule.forChild([EyeOutline, DeleteOutline]),
  ],
})
export class EmployeeViewModule {}
