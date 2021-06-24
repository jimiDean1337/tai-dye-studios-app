import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserProfile } from '../../classes/user';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent implements OnInit {
  userIsLoggedIn: Observable<any>;
  UserId: Observable<string>;
  UserProfile: Observable<UserProfile>;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService) {

     }


  ngOnInit(): void {
    this.userIsLoggedIn = this.authService.getLoggedInState();
    this.UserId = this.authService.getAuthData().pipe(map(data => {
      if (data) {
        this.UserProfile = this.userService.getUserById(data.uid).valueChanges();
      }
      return data.uid;
    }));
  }

  public signout() {
    this.authService.logOut()
      .then(success => {
        this.router.navigate(['/pages/login'])
      })
  }

}
