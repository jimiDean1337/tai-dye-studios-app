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

  init(): boolean {
    return !this.checkCookieConsent();
  }

  getCookieCache() {
    return this.cookies;
  }

  checkCookie(name: string) {
    return this.cookie.check(name);
  }

  getCookieVal(name: string) {
    return this.cookie.get(name);
  }

  setCookieConsent() {
    this.setCookieVal('COOKIE_CONSENT', 'true', Date.now() + 30, '/', '', true, 'Strict');
  }

  setCookieVal(name: string, val: any, expires?: number | Date, path?: string, domain?: string, secure?: boolean, sameSite?: 'Lax' | 'None' | 'Strict') {
    this.cookie.set(name, val, expires || null, path || null, domain || null, secure || null, sameSite || null);
    this.cookies[name] = val;
  }

}
