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
export class RegistrationRequestGuard implements CanActivate {
  private _condition: boolean = false;

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
    const registrationRequestaccessToken = localStorage.getItem(
      'registrationRequestaccessToken'
    );
    if (registrationRequestaccessToken) {
      console.log({ registrationRequestaccessToken });
      const registrationRequestaccessTokenParse = JSON.parse(
        registrationRequestaccessToken
      );
      if (registrationRequestaccessTokenParse) {
        this._condition = true;
      }
      if (!registrationRequestaccessTokenParse) {
        console.log('sin autorizacion');
        localStorage.removeItem('registrationRequestaccessToken');
        this._condition = false;
        this._router.navigate(['admin/auth/solicitud-de-registro']);
      }
    }
    if (!registrationRequestaccessToken) {
      console.log('sin autorizacion');
      this._condition = false;
      this._router.navigate(['admin/auth/solicitud-de-registro']);
    }
    return this._condition;
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
    const registrationRequestaccessToken = localStorage.getItem(
      'registrationRequestaccessToken'
    );
    if (registrationRequestaccessToken) {
      console.log({ registrationRequestaccessToken });
      const registrationRequestaccessTokenParse = JSON.parse(
        registrationRequestaccessToken
      );
      if (registrationRequestaccessTokenParse) {
        this._condition = true;
      }
      if (!registrationRequestaccessTokenParse) {
        console.log('sin autorizacion');
        localStorage.removeItem('registrationRequestaccessToken');
        this._condition = false;
        this._router.navigate(['admin/auth/solicitud-de-registro']);
      }
    }
    if (!registrationRequestaccessToken) {
      console.log('sin autorizacion');
      this._condition = false;
      this._router.navigate(['admin/auth/solicitud-de-registro']);
    }
    return this._condition;
  }
}
