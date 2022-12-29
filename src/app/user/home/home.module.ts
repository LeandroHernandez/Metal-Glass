import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UserOutline, LockOutline } from '@ant-design/icons-angular/icons';
import { RouterModule } from '@angular/router';
import { HomeService } from './home.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from '../token-inerceptor.service';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    NzGridModule,
    NzButtonModule,
    NzCardModule,
    NzDividerModule,
    NzIconModule.forChild([UserOutline, LockOutline]),
    NzPopoverModule,
    NzCarouselModule,
  ],
  providers: [
    HomeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
})
export class HomeModule {}
