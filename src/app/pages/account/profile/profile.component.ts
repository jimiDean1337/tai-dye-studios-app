import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserProfile, USER_PROFILE_DEFAULTS } from 'src/app/shared/classes/user';
// const state = {
//   userId: JSON.parse(localStorage['userId'] || '')
// }

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  UserProfile: Observable<UserProfile>
  profileDataModel: UserProfile = {
    fName: null,
    lName: null,
    email: null,
    phone: null,
    address: {
      street: null,
      street2: null,
      aptOrSuit: null,
      city: null,
      stateOrProvince: null,
      country: null,
      zipcode: null,
      sameAsBilling: false,
    },
  };
  successMessage: string;

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      console.log(params)
      const userId = params.userId;
      this.userService.getUserById(userId).subscribe(profile => {
        this.profileDataModel = profile;
      });
    })
  }

  updateProfile(id: string, data: UserProfile, form: NgForm) {
    this.userService.updateUserProfile(id, data);
  }

  /* Make a decision on adding Profile Image with upload functionality */

}
