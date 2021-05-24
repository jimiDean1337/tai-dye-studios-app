import { Component, OnInit } from '@angular/core';
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

  constructor(private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
  private userService: UserService) { }

  ngOnInit(): void {
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

}
