import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {
  private CookieCache = [];
  public allowCookieStorage: boolean = false;
  constructor(private cookie: CookieService) { }

  private get cookies() {
    return this.CookieCache;
  }

  private checkCookieConsent(): boolean {
    if (!this.cookie.check('COOKIE_CONSENT')) return false;
    const status = this.cookie.get('COOKIE_CONSENT');
    return status == 'true';
  }

  init(): boolean {
    console.log('allow cookies', this.checkCookieConsent())
    if (this.checkCookieConsent()) {
      this.allowCookieStorage = true;
      const storedCookies = this.cookie.getAll();
      const allCookies = Object.keys(storedCookies);
      for (let cookie of allCookies) {
        console.log(`${cookie}: ${storedCookies[cookie]}`);
        this.CookieCache.push({key: cookie, val: storedCookies[cookie]})
      }
      return false;
    }
    this.allowCookieStorage = false;
    return true;
  }

  getCookieCache() {
    return this.cookies;
  }

  checkCookie(name: string) {
    return this.cookie.check(name);
  }

  getCookieVal(name: string) {
    if (!this.cookie.check(name)) return false;
    return this.cookie.get(name);
  }

  setCookieConsent(allowed: string) {
    this.allowCookieStorage = allowed !== 'false';
    this.setCookieVal('COOKIE_CONSENT', allowed, Date.now() + 30, '/', '', true, 'Strict');
  }

  setCookieVal(name: string, val: any, expires?: number | Date, path?: string, domain?: string, secure?: boolean, sameSite?: 'Lax' | 'None' | 'Strict') {
    if (this.getCookieVal('COOKIE_CONSENT') == 'false') return false;
    this.cookie.set(name, val, expires || null, path || null, domain || null, secure || null, sameSite || null);
    this.cookies[name] = val;
  }

}
