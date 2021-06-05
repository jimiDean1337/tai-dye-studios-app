import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { CookiesService } from 'src/app/core/services/cookies/cookies.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserProfile } from 'src/app/shared/classes/user';
import { AlertModalComponent } from 'src/app/shared/components/modal/alert-modal/alert-modal.component';
import { GuideModalComponent } from 'src/app/shared/components/modal/guide-modal/guide-modal.component';
// const state = {
//   userId: JSON.parse(localStorage['userId'] || '')
// }

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  @ViewChild('profileHelper', {static: false}) ProfileHelper: GuideModalComponent;
  public UserProfile: Observable<UserProfile>
  public profileDataModel: UserProfile = {
    fName: '',
    lName: '',
    email: '',
    phone: '',
    address: {
      street: '',
      street2: '',
      aptOrSuit: '',
      city: '',
      stateOrProvince: '',
      country: '',
      zipcode: '',
      sameAsBilling: false,
    },
  };
  public successMessage: string;

  public guideModalContent = `
  <h3>Got a second?</h3>
  <p>To better serve you, please take a few moments to enter some basic details. This will help avoid any issues when we process orders.</p>
  <br>
  <p>Thanks!</p>
  `;

  helperModalOptions: NgbModalOptions = {
    size: 'md',
    backdrop: 'static',
    keyboard: false,
    centered: false,
    container: 'form.theme-form',
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private cookies: CookiesService,
    public title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Customer Profile - Tai-Dye Studios | Creative Clothing &amp; Accessories');
    this.route.queryParams.subscribe((params: any) => {
      // console.log(params)
      const userId = params.userId;
      this.userService.getUserById(userId).subscribe(profile => {
        this.profileDataModel = profile;
      });
    });
  }

  ngAfterViewInit() {
    if (!this.cookies.checkCookie('ORIENTATION_COMPLETE') || this.cookies.getCookieVal('ORIENTATION_COMPLETE') === 'false') {
      this.ProfileHelper.openModal().then(results => {
        this.cookies.setCookieVal('ORIENTATION_COMPLETE', results)
      });
    }
  }

  public updateProfile(id: string, data: UserProfile, form?: NgForm): void {
    this.userService.updateUserProfile(id, data).then(() => this.router.navigate(['/pages/dashboard'], { queryParams: { userId: id}}));
  }

  /* Make a decision on adding Profile Image with upload functionality */

}
