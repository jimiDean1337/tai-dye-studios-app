import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { first, map, shareReplay, switchMap, take } from 'rxjs/operators';
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
    // TODO: Add app to Google developer console
    // TODO: Add app to Facebook developer console
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
