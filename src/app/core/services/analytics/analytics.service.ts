import { Inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';
import { AngularFireAnalytics, Config, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { CookieService } from 'ngx-cookie-service';
import firebase from 'firebase';
import { AuthService } from '../auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

declare type SettingsOptions = firebase.analytics.SettingsOptions;
declare type Analytics = firebase.analytics.Analytics;
declare type Item = firebase.analytics.Item;
declare type CallOptions = firebase.analytics.AnalyticsCallOptions;
declare type CustomEventName<T> = firebase.analytics.CustomEventName<T>;
declare type CustomParams = firebase.analytics.CustomParams;


@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private userId: string;
  constructor(public analytics: AngularFireAnalytics, private cookies: CookieService) {
    this.analytics.setAnalyticsCollectionEnabled(true).then(() => {
      if (!this.cookies.check('_tds')) {
        this.userId = 'TDS-' + Math.ceil(Math.random() * Date.now()).toString();
        this.cookies.set('_tds', this.userId);
      } else {
        this.userId = this.cookies.get('_tds');
      }
      this.setUserId(this.userId)
    })
  }

  public logEvent(name: string, params?: CustomParams, options?: CallOptions) {
    return this.analytics.logEvent(name, params, options)
  }

  public setCurrentScreen(name: string, options: CallOptions = null) {
    return this.analytics.setCurrentScreen(name, options)
  }

  public setUserProperties(props: any, options: SettingsOptions) {
    return this.analytics.setUserProperties(props)
  }

  public updateConfig(config: Config) {
    return this.analytics.updateConfig(config)
  }

  private setUserId(id: string) {
    return this.analytics.setUserId(id);
  }
}
