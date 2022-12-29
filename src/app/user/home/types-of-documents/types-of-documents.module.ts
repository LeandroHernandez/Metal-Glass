import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypesOfDocumentsRoutingModule } from './types-of-documents-routing.module';
import { TypesOfDocumentsComponent } from './types-of-documents.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [TypesOfDocumentsComponent],
  imports: [
    CommonModule,
    TypesOfDocumentsRoutingModule,
    NzGridModule,
    NzCardModule,
    NzButtonModule,
  ],
})
export class TypesOfDocumentsModule {}
