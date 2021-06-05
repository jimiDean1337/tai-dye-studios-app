import { Component, OnInit } from '@angular/core';
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
    { name: 'facebook', icon: 'fa-facebook-official', classes: 'btn-facebook' },
    {name: 'google', icon: 'fa-google', classes: 'btn-google'},
  ]

  constructor(private router: Router, private authService: AuthService, private userService: UserService, public title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Customer Login - Tai-Dye Studios | Creative Clothing &amp; Accessories')
  }

  loginWithEmailAndPassword(email: string, password: string) {
    this.authService.loginWithEmailAndPassword(email, password)
      .then((success) => {
        this.router.navigate(['/pages/dashboard'], {queryParams: {userId: success.user.uid}})
      })
      .catch(error => {
        // TODO: Add error message display
        console.log('LOGIN ERROR', error)
      });
  }

  loginWithProvider(provider: string) {
    this.authService.loginWithProvider(provider)
      .then((success) => {
        console.log('Logged in w/ provider', success)
        this.userService.checkIfUserExists(success.user.uid).subscribe(exists => {
          if (exists) {
            this.router.navigate(['/pages/dashboard'], { queryParams: { userId: success.user.uid } })
          } else {
            this.userService.createNewUserFromProvider(success.user.uid, provider, success).then(() => {
              this.router.navigate(['/pages/profile'], { queryParams: { userId: success.user.uid } })
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

}
