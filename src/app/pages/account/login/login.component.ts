import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginModel = {
    email: '',
    password: ''
  };

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
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
        this.router.navigate(['/pages/dashboard'], { queryParams: { userId: success.user.uid } })
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
