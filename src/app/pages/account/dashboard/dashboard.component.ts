import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CookiesService } from 'src/app/core/services/cookies/cookies.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserAccount, UserProfile } from 'src/app/shared/classes/user';
// import { AlertModalComponent } from 'src/app/shared/components/modal/alert-modal/alert-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  public UserAccount: UserAccount;
  public UserProfile: UserProfile;
  public UserProfile$: Observable<UserProfile>;
  public UserAddresses: any;
  public UserOrders: any;
  public UserWishlist: any;
  public UserCoupons: any;
  public openDashboard: boolean = false;
  closeResult: string;
  private USER_ID: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private cookies: CookiesService,
    private userService: UserService,
  public title: Title) {
    this.UserProfile$ = this.route.queryParams.pipe(
      switchMap((params: Params) => {
        this.USER_ID = params.userId;
        this.cookies.setCookieVal('USER_ID', params.userId)
        return this.userService.getUserById(this.USER_ID)
      })
    )
  }


  ngOnInit(): void {
    this.title.setTitle('Dashboard - Tai-Dye Studios | Creative Clothing &amp; Accessories')
  }

  ngAfterViewInit() {
    if (!this.cookies.checkCookie('ORIENTATION_COMPLETE') || this.cookies.getCookieVal('ORIENTATION_COMPLETE') === 'false') {
      this.router.navigate(['/pages/profile'], {
        queryParams: { userId: this.USER_ID }
      })
    }
  }

  logout() {
    return this.authService.logOut()
      .then(() => {
        return this.router.navigate(['/pages/login']);
      })
  }

  ToggleDashboard() {
    this.openDashboard = !this.openDashboard;
  }
}
