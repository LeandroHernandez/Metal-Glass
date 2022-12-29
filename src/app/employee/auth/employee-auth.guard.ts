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
import { IEmployeeAccessToken } from 'src/interfaces/employee-access-token.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeAuthGuard implements CanActivate {
  private _condition: boolean = false;
  private _accesToken: IEmployeeAccessToken | null = null;

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
    const accessToken = localStorage.getItem('employeeAccessToken');
    if (accessToken) {
      const accessTokenParse = JSON.parse(accessToken);
      if (accessTokenParse) {
        this._accesToken = accessTokenParse;
        if (
          this._accesToken &&
          this._accesToken.access_token &&
          this._accesToken.employeeId &&
          this._accesToken.employee
        ) {
          this._condition = true;
        } else {
          localStorage.removeItem('employeeAccessToken');
          this._condition = false;
          this._router.navigate(['empleado/auth']);
        }
      } else {
        localStorage.removeItem('employeeAccessToken');
        this._condition = false;
        this._router.navigate(['empleado/auth']);
      }
    } else {
      this._condition = false;
      this._router.navigate(['empleado/auth']);
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
    const accessToken = localStorage.getItem('employeeAccessToken');
    if (accessToken) {
      const accessTokenParse = JSON.parse(accessToken);
      if (accessTokenParse) {
        this._accesToken = accessTokenParse;
        if (
          this._accesToken &&
          this._accesToken.access_token &&
          this._accesToken.employeeId &&
          this._accesToken.employee
        ) {
          this._condition = true;
        } else {
          localStorage.removeItem('employeeAccessToken');
          this._condition = false;
          this._router.navigate(['empleado/auth']);
        }
      } else {
        localStorage.removeItem('employeeAccessToken');
        this._condition = false;
        this._router.navigate(['empleado/auth']);
      }
    } else {
      this._condition = false;
      this._router.navigate(['empleado/auth']);
    }
    return this._condition;
    // return true;
    // return true;
  }
}
