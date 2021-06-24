import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { ToastrService } from 'ngx-toastr';
import { map} from 'rxjs/operators';
import { UserService } from '../user/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  Auth: AngularFireAuth['user'];
  constructor(private afAuth: AngularFireAuth,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
    }

    // Returns user auth data if logged in
  private get auth() {
    return this.Auth = this.afAuth.authState;
  }

  public getLoggedInState() {
    return this.auth.pipe(map(user => !!user));
  }

  // Get user auth data
  public getAuthData() {
    return this.auth;
  }

  // Send email verification when new user sign up
  public SendVerificationMail() {
    const actionSettings = {
      url: 'https://tai-dye-studios.com',
    }
    return this.afAuth.currentUser.then((user) => {
      return user.sendEmailVerification(actionSettings).then(() => {
        return this.router.navigate(['/pages/profile'], {queryParams: {userId: user.uid}})
      })
    })

  }

  public resetPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email)
  }

  public createUserWithEmailAndPassword(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
  }

  public createUserWithProvider(provider: string) {
    return this.loginWithProvider(provider)
  }

  // Sign-in to Firebase using email and password
  public loginWithEmailAndPassword(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
  }

  public loginWithProvider(provider: string) {
    // TODO: Add app to Twitter developer console
    const providers = {
      google: firebase.auth.GoogleAuthProvider,
      twitter: firebase.auth.TwitterAuthProvider,
      facebook: firebase.auth.FacebookAuthProvider
    };
    const selectedProvider = providers[provider];
    return this.afAuth.signInWithPopup(new selectedProvider());
  }

  public logOut() {
    // this.userService.signout()
    return this.afAuth.signOut();
  }


}
