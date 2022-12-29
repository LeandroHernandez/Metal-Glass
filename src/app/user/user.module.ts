import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { TokenInterceptorService } from './token-inerceptor.service';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, UserRoutingModule],
  // providers: [
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: TokenInterceptorService,
  //     multi: true,
  //   },
  // ],
})
export class UserModule {}
