import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/interfaces/product.interface';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public products: IProduct[] = [];
  public productsView: IProduct[] = [];
  public visible: boolean = false;
  public searchValue = '';
  public allChecked = false;
  public indeterminate = true;

  constructor(private _productsSvc: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this._productsSvc.getProducts().subscribe(
      (products) => {
        this.products = products;
        this.productsView = this.products;
        console.log({ productsView: this.productsView });
      },
      (err) => console.log({ error: err })
    );
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
  }

  updateAllChecked(): void {
    this.indeterminate = false;
    // if (this.allChecked) {
    //   this.administratorsWhoAssignsListView =
    //     this.administratorsWhoAssignsListView.map((item) => ({
    //       ...item,
    //       checked: true,
    //     }));
    // } else {
    //   this.administratorsWhoAssignsListView =
    //     this.administratorsWhoAssignsListView.map((item) => ({
    //       ...item,
    //       checked: false,
    //     }));
    // }
  }

  updateSingleChecked(): void {
    // if (this.administratorsWhoAssignsListView.every((item) => !item.checked)) {
    //   this.allChecked = false;
    //   this.indeterminate = false;
    // } else if (
    //   this.administratorsWhoAssignsListView.every((item) => item.checked)
    // ) {
    //   this.allChecked = true;
    //   this.indeterminate = false;
    // } else {
    //   this.indeterminate = true;
    // }
  }
}
