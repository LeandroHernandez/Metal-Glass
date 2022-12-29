import { Component, OnInit } from '@angular/core';
import { IClient } from 'src/interfaces/client.interface';
import { ClientsService } from './clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  public clients: Array<IClient> = [];
  public clientsView: Array<IClient> = [];
  public searchValue = '';
  public visible = false;
  public allChecked = false;
  public indeterminate = true;

  constructor(private _clientsSvc: ClientsService) {}

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this._clientsSvc.getClients().subscribe(
      (clients) => {
        this.clients = clients;
        this.clientsView = this.clients;
        console.log({ clients: this.clients });
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
