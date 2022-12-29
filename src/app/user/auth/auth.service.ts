import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITypeDocument } from 'src/interfaces/type-document.interface';
import { IAccessToken } from 'src/interfaces/access-token.interface';
import { IUser } from 'src/interfaces/user.interface';
import { IRegistrationRequestAccessToken } from 'src/interfaces/registration-request-access-token.interface';
import { IPhoto } from 'src/interfaces/photo.interface';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

firebase.initializeApp(environment.firebaseConfig);

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _storareRef = firebase.app().storage().ref();
  private _apiBase: string = environment.api;
  private _api: string = `${this._apiBase}/api/v1`;
  private _apiAuth: string = `${this._api}/auth`;

  constructor(private _http: HttpClient) {}

  getDocumentTypes(): Observable<Array<ITypeDocument>> {
    return this._http.get<Array<ITypeDocument>>(`${this._api}/type-document`);
  }

  // signIn(credentials: any): Observable<IUser> {
  signIn(credentials: any): Observable<IAccessToken> {
    console.log(credentials);
    // return this._http.post<IUser>(`${this._apiAuth}/signIn`, credentials);
    return this._http.post<IAccessToken>(
      `${this._apiAuth}/signIn`,
      credentials
    );
  }

  registrationRequest(
    credentials: { password1: string; password2: string }
    // ): Observable<IRegistrationRequestAccessToken> {
  ): Observable<IRegistrationRequestAccessToken> {
    console.log(credentials);
    // return this._http.post<IUser>(`${this._apiAuth}/signIn`, credentials);
    // return this._http.post<IRegistrationRequestAccessToken>(
    return this._http.post<IRegistrationRequestAccessToken>(
      `${this._apiAuth}/registrationRequest`,
      credentials
    );
  }

  signUp(user: any): Observable<IUser> {
    const registrationRequestaccessToken = localStorage.getItem(
      'registrationRequestaccessToken'
    );
    let token = '';
    if (registrationRequestaccessToken) {
      token = registrationRequestaccessToken;
    }
    return this._http.post<IUser>(`${this._apiAuth}/signUp`, user, {
      // headers: { Authorization: `Bearer ${token}` },
      headers: { Authorization: `Bearer ` + token },
    });
  }

  async uploadFile(name: string, imgBase64: any) {
    try {
      let response = await this._storareRef
        .child('users/' + name)
        .putString(imgBase64, 'data_url');
      return await response.ref.getDownloadURL();
    } catch (err) {
      console.log({ error: err });
      return null;
    }
  }

  registerPhoto(photoDTO: any): Observable<IPhoto> {
    return this._http.post<IPhoto>(`${this._api}/photo`, photoDTO);
  }

  addPhotoToAdmin(
    adminId: string | undefined,
    photoId: string | undefined
  ): Observable<IUser> {
    const accessToken = localStorage.getItem('accessToken');
    let token = '';
    if (accessToken) {
      const accessTokenParse: IAccessToken = JSON.parse(accessToken);
      if (accessTokenParse.access_token) {
        token = accessTokenParse.access_token;
      }
    }
    return this._http.get<IUser>(
      `${this._api}/user/addPhotoToUser/${adminId}/${photoId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
}
