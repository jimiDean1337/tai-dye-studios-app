import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuth(state.url);
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  checkAuth(url: string) {
    return this.authService.getLoggedInState()
      .pipe(
        take(1),
        map(loggedIn => {
          if (!loggedIn) {
            console.log(`ACCESS DENIED! Login to access ${url}`)
            this.router.navigate(['/pages/login']);
            return false;
          } else if (loggedIn && !loggedIn.emailVerified) {
            this.router.navigate(['/pages/verify-email']);
            return false;
          } else {
            return true;
          }
    }))
  }
}
