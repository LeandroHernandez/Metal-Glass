import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAccessToken } from 'src/interfaces/access-token.interface';
import { IAssignment } from 'src/interfaces/assignment.interface';
import { IEmployee } from 'src/interfaces/employee.interface';
import { IUser } from 'src/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  private _apiBase: string = environment.api;
  private _api: string = `${this._apiBase}/api/v1`;

  private token: string = '';

  constructor(private _http: HttpClient) {
    const accessToken = localStorage.getItem('accessToken');
    // let token = '';
    if (accessToken) {
      const accessTokenParse: IAccessToken = JSON.parse(accessToken);
      if (accessTokenParse.access_token) {
        this.token = accessTokenParse.access_token;
      }
    }
  }

  getAssignments(): Observable<Array<IAssignment>> {
    return this._http.get<Array<IAssignment>>(`${this._api}/assignment`);
  }

  getUser(userId: string): Observable<IUser> {
    return this._http.get<IUser>(`${this._api}/user/${userId}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  getUsers(): Observable<Array<IUser>> {
    return this._http.get<Array<IUser>>(`${this._api}/user`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  getEmployees(): Observable<Array<IEmployee>> {
    return this._http.get<Array<IEmployee>>(`${this._api}/employee`);
  }

  registerAssignmentAndaddAdmins(
    userId: string | undefined,
    registerFormValue: any
  ): Observable<IUser> {
    const registerAssignmentAndaddAdminsDTO = {
      theAssigned: registerFormValue.theAssigned,
      adminsIds: registerFormValue.adminsIds,
    };
    return this._http.put<IUser>(
      `${this._api}/user/registerAssignmentAndaddAdmins/${userId}`,
      registerAssignmentAndaddAdminsDTO,
      {
        headers: { Authorization: `Bearer ${this.token}` },
      }
    );
  }

  registerAssignmentAndaddEmployees(
    userId: string | undefined,
    registerFormValue: any
  ): Observable<IUser> {
    console.log({ dto: registerFormValue });
    const registerAssignmentAndaddEmployeesDTO = {
      theAssigned: registerFormValue.theAssigned,
      employeesIds: registerFormValue.employeesIds,
    };
    return this._http.put<IUser>(
      `${this._api}/user/registerAssignmentAndaddEmployees/${userId}`,
      registerAssignmentAndaddEmployeesDTO,
      {
        headers: { Authorization: `Bearer ${this.token}` },
      }
    );
  }

  registerAssignmentAndaddAdminsAndEmployees(
    userId: string | undefined,
    registerFormValue: any
  ): Observable<IUser> {
    console.log({ dto: registerFormValue });
    const registerAssignmentAndaddAdminsAndEmployeesDTO = {
      theAssigned: registerFormValue.theAssigned,
      adminsIds: registerFormValue.adminsIds,
      employeesIds: registerFormValue.employeesIds,
    };
    return this._http.put<IUser>(
      `${this._api}/user/registerAssignmentAndaddAdminsAndEmployees/${userId}`,
      registerAssignmentAndaddAdminsAndEmployeesDTO,
      {
        headers: { Authorization: `Bearer ${this.token}` },
      }
    );
  }
}
