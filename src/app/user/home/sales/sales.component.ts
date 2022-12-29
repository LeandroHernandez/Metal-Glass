import { Component, OnInit } from '@angular/core';
import { IPurchase } from 'src/interfaces/purchase.interface';
import { SalesService } from './sales.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
})
export class SalesComponent implements OnInit {
  public sales: IPurchase[] = [];
  public salesView: IPurchase[] = [];
  public searchValue = '';
  public visible = false;
  public allChecked = false;
  public indeterminate = true;
  constructor(private _salesSvc: SalesService) {}

  ngOnInit(): void {
    this.getSales();
  }

  getSales(): void {
    this._salesSvc.getSales().subscribe(
      (sales) => {
        console.log({ sales: sales });
        this.sales = sales;
        this.salesView = this.sales;
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
