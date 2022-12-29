import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoutesApp } from 'src/app/constants';
import { SignUpComponent } from './sign-up.component';

const routes: Routes = [{ path: RoutesApp.root, component: SignUpComponent }];

@NgModule({
  declarations: [SignUpComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SignUpModule {}
