import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../core/auth/auth.service";
import {UserType} from "../../../../types/user.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogged: boolean = false;
  userInfo: UserType | null = null;

  constructor(private router: Router,
              private authService: AuthService,
              private _snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.isLogged = this.authService.getIsLoggedIn();
    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
      if (this.isLogged) {
        this.getUserInfo()
      }
    });


  }

  logout(): void {
    this.authService.logout()
      .subscribe({
        next: () => {
          this.doLogout();

        },
        error: () => {
          this.doLogout();
        }
      })
  }

  doLogout(): void {
    this.authService.removeTokens();
    this.authService.userId = null;
    this._snackBar.open('Вы вышли из системы');
    this.router.navigate(['/']);
  }

  private getUserInfo() {
    this.authService.getUserInfo()
      .subscribe((data: UserType | DefaultResponseType) => {
        if ((data as DefaultResponseType).error !== undefined) {
          throw new Error((data as DefaultResponseType).message);
        }
        this.userInfo = data as UserType;
      });
  }

  navigateLogin() {
    if (!this.isLogged) {
      this.router.navigate(['/login']);
    }
  }
}
