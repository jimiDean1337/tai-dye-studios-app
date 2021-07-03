import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CookiesService } from 'src/app/core/services/cookies/cookies.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserAccount, UserProfile } from 'src/app/shared/classes/user';
import { AlertModalComponent } from 'src/app/shared/components/modal/alert-modal/alert-modal.component';
import { AccountService } from 'src/app/shared/services/account.service';
import { ProductService } from 'src/app/shared/services/product.service';
// import { AlertModalComponent } from 'src/app/shared/components/modal/alert-modal/alert-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('accountDeletionAlertModal', { static: true }) AccountDeleteAlertModal: AlertModalComponent;

  public UserProfile: Observable<UserProfile>;
  public UserOrders: any;
  public UserWishlist: any;
  public UserCoupons: any;
  public openDashboard: boolean = false;
  public closeResult: string;
  public USER_ID: string;
  public showOrders: boolean = false;

  public
  public userAccountDeleteOptions = {
    content: `<h5>Are you sure you want to delete you customer account</h5 >`,
    buttonOptions: {
      resolve: {
        value: 'Yes, Continue',
        icon: ''
      },
      reject: {
        value: 'Cancel',
        icon: ''
      }
    }
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private cookies: CookiesService,
    private authService: AuthService,
    public productService: ProductService,
    private userService: UserService,
    private accountService: AccountService,
  public title: Title) {
    this.cookies.deleteCookie('USER_ID');
    this.UserProfile = this.route.queryParams.pipe(
      switchMap((params: Params) => {
        this.USER_ID = params.userId;
        this.cookies.setCookieVal('USER_ID', params.userId)
        return this.userService.getUserById(this.USER_ID).valueChanges()
      })
    )
  }


  ngOnInit(): void {
    this.title.setTitle('Dashboard - Tai-Dye Studios | Creative Clothing & Accessories')
    // this.UserOrders$ = this.getUserOrders();

  }

  ngAfterViewInit() {
    this.UserProfile.subscribe(user => {
      if (user && user.isNewUser) {
        this.router.navigate(['/pages/profile'], {
          queryParams: { userId: this.USER_ID }
        })
      }
    })
  }

  public getUserOrders() {
    const userId = this.cookies.getCookieVal('USER_ID')
    return this.accountService.getUserOrders(userId).pipe(tap(orders => console.log(orders)));
  }

  logout() {
    return this.authService.logOut()
      .then(() => {
        return this.router.navigate(['/pages/login']);
      })
  }

  public async deleteAccount() {
    const result = await this.AccountDeleteAlertModal.openModal()
    if (!result) return;
    return await this.userService.deleteUser(this.USER_ID).then(() => {
      console.log('user db deleted')
      this.cookies.deleteAllCookies();
      setTimeout(() => {
        return this.authService.deleteUserAuth().then(() => {
          this.logout();
        });
      },0)
    });
  }

  ToggleDashboard() {
    this.openDashboard = !this.openDashboard;
  }

  ToggleOrderHistory() {
    this.showOrders = !this.showOrders;
  }
}
