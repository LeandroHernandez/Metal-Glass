import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAccessToken } from 'src/interfaces/access-token.interface';
import { IUser } from 'src/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
// export class HomeService implements HttpInterceptor {
export class HomeService {
  private _apiBase: string = environment.api;
  private _api: string = `${this._apiBase}/api/v1`;

  constructor(private _http: HttpClient) {}

  // intercept(
  //   req: HttpRequest<any>,
  //   next: HttpHandler
  // ): Observable<HttpEvent<any>> {
  //   const accessToken = localStorage.getItem('accessToken');
  //   let token = '';

  //   if (!accessToken) {
  //   }
  //   if (accessToken) {
  //     const accessTokenParse: IAccessToken = JSON.parse(accessToken);
  //     if (accessTokenParse.access_token) {
  //       token = accessTokenParse.access_token;
  //     } else {
  //       return next.handle(req);
  //     }
  //   }

  //   const request = req.clone({
  //     // headers: req.headers.set('Authorization', `Bearer ${token}`),
  //     headers: req.headers.set('Authorization', token),
  //   });
  //   console.log({ tokenSvc: token });
  //   return next.handle(request);
  // }

  // getUser(userId: string): Observable<IUser> {
  getUser(userId: string): Observable<IUser> {
    const accessToken = localStorage.getItem('accessToken');
    let token = '';
    if (accessToken) {
      const accessTokenParse: IAccessToken = JSON.parse(accessToken);
      if (accessTokenParse.access_token) {
        token = accessTokenParse.access_token;
      }
    }
    return this._http.get<IUser>(`${this._api}/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
