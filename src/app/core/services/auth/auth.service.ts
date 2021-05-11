import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  User: AngularFireAuth['user'];
  LoggedIn: BehaviorSubject<boolean>;
  constructor(private afAuth: AngularFireAuth, private router: Router, private route: ActivatedRoute) {
    this.LoggedIn = new BehaviorSubject(null);
  }

  private get user() {
    return this.User = new Observable(obs => {
      this.afAuth.authState.
        subscribe(state => {
          this.LoggedIn.next(state !== null);
          obs.next(state);
          obs.complete();
        })
      })
  }

  public getUser() {
    return this.user;
  }

  public loginWithEmailAndPassword(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((success: firebase.default.auth.UserCredential) => {
        this.router.navigate(['pages/dashboard'], { queryParams: { userId: success.user.uid } })
      })
      .catch(error => console.log(`ERROR!: ${error}`, error));
  }

  public loginWithProvider(provider: firebase.default.auth.AuthProvider) {
    return this.afAuth.signInWithPopup(provider)
      .then((success: firebase.default.auth.UserCredential) => {
        this.router.navigate(['pages/dashboard'], { queryParams: { userId: success.user.uid } })
      })
      .catch(error => console.log(`ERROR!: ${error}`, error));
  }

  public logOut() {
    return this.afAuth.signOut()
      .then(() => {
        this.router.navigate(['pages/login'])
      })
      .catch(error => console.log(`ERROR!: ${error}`, error));
  }


}
