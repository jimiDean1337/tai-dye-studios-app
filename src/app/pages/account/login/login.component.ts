import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginModel = {
    email: '',
    password: ''
  };

  public authProviders: any = [
    // { name: 'facebook', icon: 'fa-facebook-official', classes: 'btn-facebook' },
    {name: 'google', icon: 'fa-google', classes: 'btn-google'},
  ]
  loginForm: FormGroup;
  public showPassword: boolean = false;
  public passReg = /^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,16}$/;

  public loginError: any = {};

  constructor(private router: Router, private authService: AuthService, private userService: UserService, public title: Title, public fb: FormBuilder) {
    this.loginForm = this.fb.group({
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    })
  }

  ngOnInit(): void {
    this.title.setTitle('Customer Login - Tai-Dye Studios | Creative Clothing &Accessories')
  }

  clearLoginError() {
    this.loginError = {};
  }

  loginWithEmailAndPassword() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.authService.loginWithEmailAndPassword(email, password)
      .then((credentials) => {
        if (credentials && credentials.user.emailVerified) {
          this.router.navigate(['/pages/dashboard'], {queryParams: {userId: credentials.user.uid}})
        } else {
          this.router.navigate(['/pages/verify-email']);
        }
      })
      .catch(error => {
        this.loginError.message = error.message;
        // TODO: Add error message display
        console.log('LOGIN ERROR', error)
      });
  }

  loginWithProvider(provider: string) {
    this.authService.loginWithProvider(provider)
      .then((success) => {
        // console.log('Logged in w/ provider', success)
        this.userService.checkIfUserExists(success.user.uid).subscribe(exists => {
          if (exists && success.user.emailVerified) {
            this.router.navigate(['/pages/dashboard'], { queryParams: { userId: success.user.uid } })
          } else {
            this.userService.createNewUserFromProvider(success.user.uid, provider, success).then(() => {
              this.router.navigate(['/pages/verify-email'], { queryParams: { userId: success.user.uid } });
            })
          }
        })
      })
      .catch(error => {
        // TODO: Add error message display
        console.log('LOGIN ERROR', error)
      });
  }

  goToRegistration() {
    this.router.navigate(['/pages/register']);
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

}
