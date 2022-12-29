import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITypeDocument } from 'src/interfaces/type-document.interface';

@Injectable({
  providedIn: 'root',
})
export class TypesOfDocumentsService {
  private _apiBase: string = environment.api;
  private _api: string = `${this._apiBase}/api/v1`;

  constructor(private _http: HttpClient) {}

  getDocumentTypes(): Observable<Array<ITypeDocument>> {
    return this._http.get<Array<ITypeDocument>>(`${this._api}/type-document`);
  }

  registerDocumentType(documentTypeDTO: any): Observable<ITypeDocument> {
    console.log({ dto: documentTypeDTO });
    return this._http.post<ITypeDocument>(
      `${this._api}/type-document`,
      documentTypeDTO
    );
  }
}
