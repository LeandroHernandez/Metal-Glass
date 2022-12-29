import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAccessToken } from 'src/interfaces/access-token.interface';
import { IClient } from 'src/interfaces/client.interface';
import { IProduct } from 'src/interfaces/product.interface';
import { IPurchase } from 'src/interfaces/purchase.interface';
import { IUser } from 'src/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
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

  getSales(): Observable<Array<IPurchase>> {
    return this._http.get<Array<IPurchase>>(`${this._api}/purchase`);
  }

  getClients(): Observable<Array<IClient>> {
    return this._http.get<Array<IClient>>(`${this._api}/client`);
  }

  getClient(id: string): Observable<IClient> {
    return this._http.get<IClient>(`${this._api}/client/${id}`);
  }

  getProducts(): Observable<Array<IProduct>> {
    return this._http.get<Array<IProduct>>(`${this._api}/product`);
  }

  getProduct(id: string): Observable<IProduct> {
    return this._http.get<IProduct>(`${this._api}/product/${id}`);
  }

  RegisterSale(saleDTO: any): Observable<IUser> {
    console.log({ saleDTO });
    return this._http.post<IUser>(
      `${this._api}/user/RegisterPurchase`,
      saleDTO,
      {
        headers: { Authorization: `Bearer ${this.token}` },
      }
    );
  }
}
