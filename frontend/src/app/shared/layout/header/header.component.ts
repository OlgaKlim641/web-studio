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
  private timeoutId: any;

  constructor(private router: Router,
              private authService: AuthService,
              private _snackBar: MatSnackBar) {
    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit(): void {
    this.authService.isLogged$.subscribe(isLoggedIn => {
      this.isLogged = isLoggedIn;
      this.getUserInfo();
    });

    if (this.isLogged) {
      this.getUserInfo()
    }
  }

  protected navigateLogin(): void {
    if (!this.isLogged) {
      this.router.navigate(['/login']);
    } else {
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {

      }, 3000);
    }
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

}
