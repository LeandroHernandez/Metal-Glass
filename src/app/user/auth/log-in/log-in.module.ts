import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoutesApp } from 'src/app/constants';
import { LogInComponent } from './log-in.component';
import { UserOutline, LockOutline } from '@ant-design/icons-angular/icons';
import { ReactiveFormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

const routes: Routes = [{ path: RoutesApp.root, component: LogInComponent }];

@NgModule({
  declarations: [LogInComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NzIconModule.forChild([UserOutline, LockOutline]),
    NzFormModule,
    NzInputModule,
    NzGridModule,
    NzCardModule,
    NzButtonModule,
  ],
})
export class LogInModule {}
