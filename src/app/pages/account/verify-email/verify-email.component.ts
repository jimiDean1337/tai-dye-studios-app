import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  accountInfo: any = {};
  public isVerified$:Observable<boolean>;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params: Params) => {
        this.authService.getLoggedInState()
          .subscribe(user => {
            this.accountInfo = {
              email: user.email,
              user
            }
            if (user.emailVerified) {
              // console.log(user)
              this.router.navigate(['/pages/profile'], {queryParams: {userId: user.uid}})
            }
          })
    })
   }

  ngOnInit(): void {
  }

  public refreshPage() {
    location.reload()
  }

}
