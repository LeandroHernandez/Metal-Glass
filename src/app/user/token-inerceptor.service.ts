import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { IAccessToken } from 'src/interfaces/access-token.interface';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('accessToken');
    let token = '';

    if (!accessToken) {
    }
    if (accessToken) {
      const accessTokenParse: IAccessToken = JSON.parse(accessToken);
      if (accessTokenParse.access_token) {
        token = accessTokenParse.access_token;
      } else {
        return next.handle(req);
      }
    }

    const request = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    console.log({ tokenSvc: token });
    console.log({ request: request });
    return next.handle(request);
  }
}
