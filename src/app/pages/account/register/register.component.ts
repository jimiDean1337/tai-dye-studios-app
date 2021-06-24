import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CookiesService } from 'src/app/core/services/cookies/cookies.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserProfile } from 'src/app/shared/classes/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public authProviders: any = [
    // { name: 'facebook', icon: 'fa-facebook-official', classes: 'btn-facebook' },
    { name: 'google', icon: 'fa-google', classes: 'btn-google' },
  ]
  public registrationForm: FormGroup;

  public showPassword: boolean = false;
  public passReg = /^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,16}$/;

  public errorMsg: any = {
    type: null,
    msg: null
  }

  constructor(private router: Router,
    public fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private userService: UserService,
    private cookies: CookiesService,
    public title: Title) {
    this.registrationForm = this.fb.group({
      fName: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      lName: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    })
   }

  ngOnInit(): void {
    this.title.setTitle('Customer Register - Tai-Dye Studios | Creative Clothing & Accessories')
  }

  registerNewUser(form: any) {
    this.authService.createUserWithEmailAndPassword(form.email, form.password)
      .then(success => {
        const profileData: UserProfile = {
          fName: form.fName,
          lName: form.lName,
          email: form.email,
          id: success.user.uid,
          displayName: `${form.fname} ${form.lname}`,
        }
        this.userService.createNewUser(profileData.id, profileData)
          .then(ready => {
            this.cookies.setCookieVal('USER_ID', profileData.id)
            this.router.navigate(['/pages/profile'], { queryParams: { userId: profileData.id}})
            this.toastr.success('Nice! You are registered')
          })
        })
      .catch(error => {
          // TODO: Add error message display
        this.toastr.error(`Uh oh! ${error.message}`);
        this.errorMsg.type = error.code;
        this.errorMsg.msg = error.msg;
          console.log(`ERROR Registering Account!!`, error)
        });
  }

  registerWithProvider(provider: string) {
    this.authService.loginWithProvider(provider)
      .then((success) => {
        // console.log('Logged in w/ provider', success)
        this.userService.checkIfUserExists(success.user.uid).subscribe(exists => {
          if (exists) {
            this.router.navigate(['/pages/dashboard'], { queryParams: { userId: success.user.uid } })
          } else {
            this.userService.createNewUserFromProvider(success.user.uid, provider, success).then(() => {
              this.cookies.setCookieVal('USER_ID', success.user.uid)
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

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

}
