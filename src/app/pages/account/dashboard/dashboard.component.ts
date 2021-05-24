import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserAccount, UserProfile } from 'src/app/shared/classes/user';
import { AlertModalComponent } from 'src/app/shared/components/modal/alert-modal/alert-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('profileHelper') ProfileHelper: AlertModalComponent;
  public UserAccount: UserAccount;
  public UserProfile: UserProfile;
  public UserProfile$: Observable<UserProfile>;
  public UserAddresses: any;
  public UserOrders: any;
  public UserWishlist: any;
  public UserCoupons: any;
  public openDashboard: boolean = false;
  closeResult: string;

  constructor(private router: Router,
    private route: ActivatedRoute,

    private authService: AuthService,
    private userService: UserService) {
    this.UserProfile$ = this.route.queryParams.pipe(
      switchMap((params: Params) => {
        return this.userService.getUserById(params.userId)
      })
    )
    // this.route.queryParams.subscribe((params: Params) => {
    //   this.userService.getUserById(params.userId)
    //     .subscribe(profile => this.UserProfile = profile)
    // })
  }

  ngOnInit(): void {
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
