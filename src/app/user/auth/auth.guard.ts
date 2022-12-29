import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { IAccessToken } from 'src/interfaces/access-token.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private _condition: boolean = false;
  private _accesToken: IAccessToken | null = null;

  constructor(private _router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this._condition = false;
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const accessTokenParse = JSON.parse(accessToken);
      if (accessTokenParse) {
        this._accesToken = accessTokenParse;
        if (
          this._accesToken &&
          this._accesToken.access_token &&
          this._accesToken.userId &&
          this._accesToken.user
        ) {
          this._condition = true;
        } else {
          localStorage.removeItem('accessToken');
          this._condition = false;
          this._router.navigate(['admin/auth']);
        }
      } else {
        localStorage.removeItem('accessToken');
        this._condition = false;
        this._router.navigate(['admin/auth']);
      }
    } else {
      this._condition = false;
      this._router.navigate(['admin/auth']);
    }
    return this._condition;
    // return true;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this._condition = false;
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const accessTokenParse = JSON.parse(accessToken);
      if (accessTokenParse) {
        this._accesToken = accessTokenParse;
        if (
          this._accesToken &&
          this._accesToken.access_token &&
          this._accesToken.userId &&
          this._accesToken.user
        ) {
          this._condition = true;
        } else {
          localStorage.removeItem('accessToken');
          this._condition = false;
          this._router.navigate(['admin/auth']);
        }
      } else {
        localStorage.removeItem('accessToken');
        this._condition = false;
        this._router.navigate(['admin/auth']);
      }
    } else {
      this._condition = false;
      this._router.navigate(['admin/auth']);
    }
    return this._condition;
    // return true;
    // return true;
  }
}
