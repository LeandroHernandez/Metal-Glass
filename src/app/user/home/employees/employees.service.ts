import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEmployee } from 'src/interfaces/employee.interface';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { IPhoto } from 'src/interfaces/photo.interface';
import { ITypeDocument } from 'src/interfaces/type-document.interface';
import { IUser } from 'src/interfaces/user.interface';
import { IAccessToken } from 'src/interfaces/access-token.interface';

firebase.initializeApp(environment.firebaseConfig);

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private _storareRef = firebase.app().storage().ref();
  private _apiBase: string = environment.api;
  private _api: string = `${this._apiBase}/api/v1`;

  constructor(private _http: HttpClient) {}

  getDocumentTypes(): Observable<Array<ITypeDocument>> {
    return this._http.get<Array<ITypeDocument>>(`${this._api}/type-document`);
  }

  getEmployees(): Observable<Array<IEmployee>> {
    return this._http.get<Array<IEmployee>>(`${this._api}/employee`);
  }

  getEmployee(id: string): Observable<IEmployee> {
    return this._http.get<IEmployee>(`${this._api}/employee/${id}`);
  }

  registerEmployee(employeeDTO: any): Observable<IEmployee> {
    console.log({ dto: employeeDTO });
    return this._http.post<IEmployee>(`${this._api}/employee`, employeeDTO);
  }

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

  addPhotoToEmployee(
    employeeId: string | undefined,
    photoId: string | undefined
  ): Observable<IEmployee> {
    return this._http.get<IEmployee>(
      `${this._api}/employee/addPhotoToEmployee/${employeeId}/${photoId}`
    );
  }
}
