import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAccessToken } from 'src/interfaces/access-token.interface';
import { IUser } from 'src/interfaces/user.interface';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public user: IUser | null = null;
  public nzPopoverVisible: boolean = false;

  constructor(private _homeSvc: HomeService, private _router: Router) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      console.log({ accessToken: accessToken });
      const accessTokenParse: IAccessToken = JSON.parse(accessToken);
      console.log({ accessTokenParse: accessTokenParse });
      this._homeSvc.getUser(accessTokenParse.userId).subscribe(
        (user) => {
          this.user = user;
        },
        (err) => console.log({ error: err })
      );
    }
  }

  LogOut(): void {
    localStorage.removeItem('accessToken');
    this._router.navigate(['admin/auth/ingresar']);
  }
}
