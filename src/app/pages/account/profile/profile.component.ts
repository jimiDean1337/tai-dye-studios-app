import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
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
  public UserProfile: Observable<UserProfile>;
  public profileForm: FormGroup;
  public profileShippingForm: FormGroup;
  public profileBillingForm: FormGroup;

  public successMessage: string;

  public guideModalContent = `
  <h3>Customer Account and Shipping Information</h3>
  <p>To save you time during checkout, please take a few moments to fill out some basic account information.</p>
  <p>Every time you checkout you will be given the option to change where to ship your purchased items, but you can set a defauilt shipping address to make things easier.</p>
  <br>
  `;

  helperModalOptions: NgbModalOptions = {
    size: 'md',
    backdrop: 'static',
    keyboard: false,
    centered: true,
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private userService: UserService,
    private cookies: CookiesService,
    public title: Title) {
    this.profileForm = this.fb.group({
      fName: [''],
      lName: [''],
      phone: [''],
      email: [''],
    })

    this.profileShippingForm = this.fb.group({
      street: [''],
      city: [''],
      stateOrProvince: [''],
      country: [''],
      zipcode: [''],
    })
    }

  ngOnInit(): void {
    this.title.setTitle('Customer Profile - Tai-Dye Studios | Creative Clothing & Accessories');
    this.route.queryParams.subscribe((params: any) => {
      // console.log(params)
      const userId = params.userId;
      this.UserProfile = this.userService.getUserById(userId).valueChanges()
        this.UserProfile.subscribe(profile => {
          // console.log('User Profile Retrieved: ', profile)
        const profileFormData = {
          fName: profile.fName || '',
          lName: profile.lName || '',
          phone: profile.phone || '',
          email: profile.email || ''
        };
        const profileShippingFormData = {
          street: profile.address.street || '',
          city: profile.address.city || '',
          stateOrProvince: profile.address.stateOrProvince || '',
          country: profile.address.country || '',
          zipcode: profile.address.zipcode || ''
          }

        this.profileForm.patchValue({...profileFormData});
        this.profileShippingForm.patchValue({ ...profileShippingFormData });
      })
    });
  }

  ngAfterViewInit() {
        this.UserProfile.pipe(take(1)).subscribe(user => {
          if (user && user.isNewUser) {
            this.ProfileHelper.openModal()
          }
        })
  }

  public cancel() {
    const userId = this.cookies.getCookieVal('USER_ID');
    this.router.navigate(['/pages/dashboard'], { queryParams: { userId: userId } })
  }

  public updateProfile(): void {
    const userId = this.cookies.getCookieVal('USER_ID')
    const data = {address: {...this.profileShippingForm.value}, ...this.profileForm.value};
    data.isNewUser = false;
    // console.log('profile updating...', data)
    this.userService.updateUserProfile(userId, {...data}).then(() => {
      this.router.navigate(['/pages/dashboard'], { queryParams: { userId: userId } })
    });
  }

  /* Make a decision on adding Profile Image with upload functionality */

}
