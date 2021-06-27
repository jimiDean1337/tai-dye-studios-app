import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {
  private CookieCache = [];
  constructor(private cookie: CookieService) { }

  private get cookies() {
    return this.CookieCache;
  }

  private checkCookieConsent(): boolean {
    return this.cookie.check('COOKIE_CONSENT');
  }

  public init(): boolean {
    return !this.checkCookieConsent();
  }

  public getCookieCache() {
    return this.cookies;
  }

  public checkCookie(name: string) {
    return this.cookie.check(name);
  }

  public getCookieVal(name: string) {
    return this.cookie.get(name);
  }

  public deleteCookie(name: string) {
    return this.cookie.delete(name);
  }

  public deleteAllCookies() {
    return this.cookie.deleteAll();
  }

  public setCookieConsent() {
    this.setCookieVal('COOKIE_CONSENT', 'true', Date.now() + 30, '/', '', true, 'Strict');
  }

  public setCookieVal(name: string, val: any, expires?: number | Date, path?: string, domain?: string, secure?: boolean, sameSite?: 'Lax' | 'None' | 'Strict') {
    this.cookie.delete(name);
    this.cookie.set(name, val, expires || null, path || null, domain || null, secure || null, sameSite || null);
    this.cookies[name] = val;
  }

}
