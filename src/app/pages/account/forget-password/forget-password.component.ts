import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  public email: FormControl = new FormControl('', [Validators.required,Validators.email])
  public userNotFound: boolean = false;
  public resetLinkSent: boolean = false;
  public resetCountDown: number;
  constructor(public title: Title, private router: Router, private toastr: ToastrService, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.title.setTitle('Password Reset - Tai-Dye Studios | Creative Clothing & Accessories')
  }

  public sendPasswordResetEmail(email: string) {
    this.resetCountDown = 5;
    this.userService.checkForUserByEmail(email).pipe(take(1)).subscribe(results => {
      // console.log('Email Found: ', results)
      if (!results) {
        this.userNotFound = true;
        this.toastr.error(`No active account with this email found`)
        setInterval(() => {
          this.resetCountDown--;
        }, 1000)
        setTimeout(() => {
          this.email.reset();
          this.userNotFound = false;
        }, 5000)
      } else {
        this.userService.resetPassword(email).then(() => {
          this.resetLinkSent = true;
          this.toastr.success('A link has been sent to: ' + email);
          setTimeout(() => {
            this.router.navigate(['pages/login'])
          }, 3000)
        })
      }
    })
  }

}
