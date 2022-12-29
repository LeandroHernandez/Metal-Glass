import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAccessToken } from 'src/interfaces/access-token.interface';
import { IClient } from 'src/interfaces/client.interface';
import { IProduct } from 'src/interfaces/product.interface';
import { IPurchase } from 'src/interfaces/purchase.interface';
import { IUser } from 'src/interfaces/user.interface';
import { SalesService } from '../../sales.service';

@Component({
  selector: 'app-sale-register',
  templateUrl: './sale-register.component.html',
  styleUrls: ['./sale-register.component.css'],
})
export class SaleRegisterComponent implements OnInit {
  public client: IClient | null = null;
  public clients: IClient[] = [];
  public clientsView: IClient[] = [];
  public products: IProduct[] = [];
  public productsPreviewView: IProduct[] = [];
  public productsView: IProduct[] = [];
  public clientName: string = '';

  public accessToken: IAccessToken | null = null;
  // public selectedProductsReview: Array<{
  //   // product: IProduct;
  //   product: string;
  //   price: number;
  //   discount: number;
  //   amount: number;
  //   valuePerUnity: number;
  //   value: number;
  // }> = [
  //   {
  //     product: 'hoa',
  //     price: 2,
  //     discount: 2,
  //     amount: 2,
  //     valuePerUnity: 3,
  //     value: 2,
  //   },
  // ];
  public selectedProductsReview: Array<{
    // product: IProduct;
    product: string;
    price: number;
    discount: number;
    amount: number;
    valuePerUnity: number;
    value: number;
  }> = [];
  public subValue: number = 0;
  public value: number = 0;

  public registerSaleForm = this._fb.group({
    client: [null, [Validators.required]],
    discounts: [0, [Validators.required, Validators.min(0)]],
    selectedProducts: this._fb.array([
      this._fb.group({
        productId: ['', [Validators.required]],
        amount: [1, [Validators.required, Validators.min(1)]],
      }),
    ]),
  });

  get selectedProducts() {
    return this.registerSaleForm.controls['selectedProducts'] as FormArray;
  }

  get discounts() {
    return this.registerSaleForm.controls['discounts'] as FormControl;
  }

  listOfControl: Array<{ id: number; controlInstance: string }> = [];

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _salesSvc: SalesService
  ) {}

  ngOnInit(): void {
    this.getClients();
    this.getProducts();
    this.getUser();
  }

  getClient(): void {
    if (this.registerSaleForm.value.client) {
      this._salesSvc.getClient(this.registerSaleForm.value.client).subscribe(
        (clientBD) => {
          this.client = clientBD;
        },
        (err) => console.log({ error: err })
      );
    }
  }

  getUser(): void {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const accessTokenParse: IAccessToken = JSON.parse(accessToken);
      if (accessTokenParse) {
        this.accessToken = accessTokenParse;
        console.log({ accessToken });
      }
    }
  }

  getClients(): void {
    this._salesSvc.getClients().subscribe(
      (clients) => {
        console.log({ clients: clients });
        this.clients = clients;
        this.clientsView = this.clients;
      },
      (err) => console.log({ error: err })
    );
  }

  getProducts(): void {
    this._salesSvc.getProducts().subscribe(
      (products) => {
        console.log({ products: products });
        this.products = products;
        this.productsView = this.products;
        this.productsPreviewView = this.products;
      },
      (err) => console.log({ error: err })
    );
  }

  addField(): void {
    if (this.selectedProducts.value.length < this.products.length) {
      const selectedProduct = this._fb.group({
        productId: ['', [Validators.required]],
        amount: [1, [Validators.required]],
      });

      this.selectedProducts.push(selectedProduct);

      console.log({ form: this.registerSaleForm });
    } else {
      console.log({ msg: 'no hay más productos' });
    }
  }

  removeField(i: number): void {
    if (this.selectedProducts.length > 1) {
      // this.selectedProducts.removeAt(i);
      // let list: IProduct[] = [];
      // list = this.products;
      // console.log({ value: this.selectedProducts.value });
      // this.selectedProducts.value.forEach(
      //   (selectedProduct: { productId: string; amount: number }) => {
      //     list = list.filter((item) => item._id !== selectedProduct.productId);
      //   }
      // );
      // this.selectedProductsReview = [];
      // this.subValue = 0;
      // this.value = 0;
      // this.selectedProducts.value.forEach(
      //   (selectedProduct: { productId: string; amount: number }) => {
      //     if (selectedProduct.productId) {
      //       this._salesSvc.getProduct(selectedProduct.productId).subscribe(
      //         (prdBD) => {
      //           const newSelectedProduct = {
      //             // product: prdBD,
      //             product: prdBD.productName,
      //             price: prdBD.price,
      //             discount: prdBD.discount,
      //             amount: selectedProduct.amount,
      //             valuePerUnity:
      //               prdBD.price - (prdBD.price / 100) * prdBD.discount,
      //             value:
      //               (prdBD.price - (prdBD.price / 100) * prdBD.discount) *
      //               selectedProduct.amount,
      //           };
      //           this.subValue = this.subValue + newSelectedProduct.value;
      //           this.selectedProductsReview.push(newSelectedProduct);
      //           this.value =
      //             this.subValue - (this.subValue / 100) * this.discounts.value;
      //         },
      //         (err) => console.log({ error: err })
      //       );
      //     }
      //   }
      // );
      // console.log({ selectedProductsReview: this.selectedProductsReview });
      // this.productsView = list;
      this.resetReview();
    }
  }

  log(e: string): void {
    console.log({ e: e });
    // let list: IProduct[] = [];
    // list = this.products;
    // console.log({ value: this.selectedProducts.value });
    // this.selectedProducts.value.forEach(
    //   (selectedProduct: { productId: string; amount: number }) => {
    //     list = list.filter((item) => item._id !== selectedProduct.productId);
    //   }
    // );
    // this.selectedProductsReview = [];
    // this.subValue = 0;
    // this.value = 0;
    // this.selectedProducts.value.forEach(
    //   (selectedProduct: { productId: string; amount: number }) => {
    //     if (selectedProduct.productId) {
    //       this._salesSvc.getProduct(selectedProduct.productId).subscribe(
    //         (prdBD) => {
    //           const newSelectedProduct = {
    //             // product: prdBD,
    //             product: prdBD.productName,
    //             price: prdBD.price,
    //             discount: prdBD.discount,
    //             amount: selectedProduct.amount,
    //             valuePerUnity:
    //               prdBD.price - (prdBD.price / 100) * prdBD.discount,
    //             value:
    //               (prdBD.price - (prdBD.price / 100) * prdBD.discount) *
    //               selectedProduct.amount,
    //           };
    //           this.subValue = this.subValue + newSelectedProduct.value;
    //           this.selectedProductsReview.push(newSelectedProduct);
    //           this.value =
    //             this.subValue - (this.subValue / 100) * this.discounts.value;
    //         },
    //         (err) => console.log({ error: err })
    //       );
    //     }
    //   }
    // );
    // console.log({ selectedProductsReview: this.selectedProductsReview });
    // this.productsView = list;
    this.resetReview();
  }

  porcentFunction(e: number): void {
    if (e > 0) {
      this.value = this.subValue - (this.subValue / 100) * this.discounts.value;
    }
  }

  aomuntFunction(e: number): void {
    if (e > 0) {
      // this.selectedProductsReview = [];
      // this.subValue = 0;
      // this.value = 0;
      // this.selectedProducts.value.forEach(
      //   (selectedProduct: { productId: string; amount: number }) => {
      //     if (selectedProduct.productId) {
      //       this._salesSvc.getProduct(selectedProduct.productId).subscribe(
      //         (prdBD) => {
      //           const newSelectedProduct = {
      //             // product: prdBD,
      //             product: prdBD.productName,
      //             price: prdBD.price,
      //             discount: prdBD.discount,
      //             amount: selectedProduct.amount,
      //             valuePerUnity:
      //               prdBD.price - (prdBD.price / 100) * prdBD.discount,
      //             value:
      //               (prdBD.price - (prdBD.price / 100) * prdBD.discount) *
      //               selectedProduct.amount,
      //           };
      //           this.subValue = this.subValue + newSelectedProduct.value;
      //           this.selectedProductsReview.push(newSelectedProduct);
      //           this.value =
      //             this.subValue - (this.subValue / 100) * this.discounts.value;
      //         },
      //         (err) => console.log({ error: err })
      //       );
      //     }
      //   }
      // );
      // console.log({ selectedProductsReview: this.selectedProductsReview });
      this.resetReview();
    }
  }

  resetReview(): void {
    let list: IProduct[] = [];
    list = this.products;
    console.log({ value: this.selectedProducts.value });
    this.selectedProducts.value.forEach(
      (selectedProduct: { productId: string; amount: number }) => {
        list = list.filter((item) => item._id !== selectedProduct.productId);
      }
    );
    this.selectedProductsReview = [];
    this.subValue = 0;
    this.value = 0;
    this.selectedProducts.value.forEach(
      (selectedProduct: { productId: string; amount: number }) => {
        if (selectedProduct.productId) {
          this._salesSvc.getProduct(selectedProduct.productId).subscribe(
            (prdBD) => {
              const newSelectedProduct = {
                // product: prdBD,
                product: prdBD.productName,
                price: prdBD.price,
                discount: prdBD.discount,
                amount: selectedProduct.amount,
                valuePerUnity:
                  prdBD.price - (prdBD.price / 100) * prdBD.discount,
                value:
                  (prdBD.price - (prdBD.price / 100) * prdBD.discount) *
                  selectedProduct.amount,
              };
              this.subValue = this.subValue + newSelectedProduct.value;
              this.selectedProductsReview.push(newSelectedProduct);
              this.value =
                this.subValue - (this.subValue / 100) * this.discounts.value;
            },
            (err) => console.log({ error: err })
          );
        }
      }
    );
    console.log({ selectedProductsReview: this.selectedProductsReview });
    this.productsView = list;
  }

  registerSale(): void {
    console.log({ registerSaleForm: this.registerSaleForm.value });
    if (this.registerSaleForm.valid) {
      console.log({ status: 'valid' });
      if (this.accessToken?.userId) {
        let selectedProductsList: Array<{
          product: string;
          quantityOfThisProductInThePurchase: number;
        }> = [];
        this.selectedProducts.value.forEach(
          (selectedProduct: { productId: string; amount: number }) => {
            selectedProductsList.push({
              product: selectedProduct.productId,
              quantityOfThisProductInThePurchase: selectedProduct.amount,
            });
          }
        );
        const saleDTO = {
          userId: this.accessToken.userId,
          clientId: this.registerSaleForm.value.client,
          subValue: this.subValue,
          discounts: this.discounts.value,
          totalValue: this.value,
          selectedProducts: selectedProductsList,
        };
        this._salesSvc.RegisterSale(saleDTO).subscribe(
          (saleBD) => {
            console.log(saleBD);
            this._router.navigate(['admin/home/ventas']);
          },
          (err) => console.log({ error: err })
        );
      }
    } else {
      console.log({ status: 'invalid' });
    }
  }
}
