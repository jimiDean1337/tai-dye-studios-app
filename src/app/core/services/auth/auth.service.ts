import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  User: AngularFireAuth['user'] | Observable<null>;
  LoggedIn: BehaviorSubject<boolean>;
  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute) {
      this.LoggedIn = new BehaviorSubject(null);
    }

    // Returns user auth data if logged in
    private get user() {
    return this.User = new Observable(obs => {
      this.afAuth.authState
        .subscribe(state => {
          this.LoggedIn.next(state !== null);
          obs.next(state);
          obs.complete();
        })
      })
  }

  // Get user auth data
  public getUser() {
    return this.user;
  }

  // Sign-in to Firebase using email and password
  // Get customer data
  public loginWithEmailAndPassword(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
  }

  public loginWithProvider(provider: firebase.default.auth.AuthProvider) {
    return this.afAuth.signInWithPopup(provider)
  }

  public logOut() {
    return this.afAuth.signOut()
  }


}
