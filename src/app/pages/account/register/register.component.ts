import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserProfile } from 'src/app/shared/classes/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationModel: any = {}

  public authProviders: any = [
    { name: 'facebook', icon: 'fa-facebook-official', classes: 'btn-facebook' },
    { name: 'google', icon: 'fa-google', classes: 'btn-google' },
  ]

  constructor(private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
  private userService: UserService,
  public title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Customer Register - Tai-Dye Studios | Creative Clothing &amp; Accessories')
  }

  registerNewUser(email: string, password: string, fname: string, lname: string) {
    this.authService.createUserWithEmailAndPassword(email, password)
      .then(success => {
        const profileData: UserProfile = {
          fName: fname,
          lName: lname,
          email,
          id: success.user.uid,
          displayName: `${fname} ${lname}`,
        }
        this.userService.createNewUser(profileData.id, profileData)
          .then(ready => {
            this.router.navigate(['/pages/profile'], { queryParams: { userId: profileData.id}})
            this.toastr.success('Nice! You are registered')
          })
        })
      .catch(error => {
          // TODO: Add error message display
          this.toastr.error(`Uh oh! ${error.message}`)
          console.log(`ERROR Registering Account!!`, error)
        });
  }

  registerWithProvider(provider: string) {
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

}
