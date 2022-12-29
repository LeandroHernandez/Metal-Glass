import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IProduct } from 'src/interfaces/product.interface';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { IPhoto } from 'src/interfaces/photo.interface';

firebase.initializeApp(environment.firebaseConfig);

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private _storareRef = firebase.app().storage().ref();
  private _apiBase: string = environment.api;
  private _api: string = `${this._apiBase}/api/v1`;

  constructor(private _http: HttpClient) {}

  getProducts(): Observable<Array<IProduct>> {
    return this._http.get<Array<IProduct>>(`${this._api}/product`);
  }

  registerProduct(productDTO: any): Observable<IProduct> {
    console.log({ dto: productDTO });
    return this._http.post<IProduct>(`${this._api}/product`, productDTO);
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

  addPhotoToProduct(
    productId: string | undefined,
    photoId: string | undefined
  ): Observable<IProduct> {
    return this._http.get<IProduct>(
      `${this._api}/product/addPhotoToProduct/${productId}/${photoId}`
    );
  }
}
