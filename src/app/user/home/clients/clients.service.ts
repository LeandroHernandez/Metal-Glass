import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IClient } from 'src/interfaces/client.interface';
import { ITypeDocument } from 'src/interfaces/type-document.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private _apiBase: string = environment.api;
  private _api: string = `${this._apiBase}/api/v1`;

  constructor(private _http: HttpClient) {}

  getClients(): Observable<Array<IClient>> {
    return this._http.get<Array<IClient>>(`${this._api}/client`);
  }

  getDocumentTypes(): Observable<Array<ITypeDocument>> {
    return this._http.get<Array<ITypeDocument>>(`${this._api}/type-document`);
  }

  registerClient(clientDTO: any): Observable<IClient> {
    console.log({ dto: clientDTO });
    return this._http.post<IClient>(`${this._api}/client`, clientDTO);
  }
}
