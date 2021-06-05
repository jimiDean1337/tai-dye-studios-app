import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { map, delay, withLatestFrom } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // For Progressbar
  loaders = this.loader.progress$.pipe(
    delay(1000),
    withLatestFrom(this.loader.progress$),
    map(v => v[1]),
  );

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    public meta: Meta,
    private loader: LoadingBarService, translate: TranslateService) {
    if (isPlatformBrowser(this.platformId)) {
      translate.setDefaultLang('en');
      translate.addLangs(['en', 'fr']);
    }
    /* TODO: Add Title and Meta tags for all pages */
    this.meta.addTags([
      { name: 'author', content: 'Sure Marketing Solutions: Jimi Flynn' },
      // { property: 'og:title', content: 'Tai-Dye Studios' },
      // { property: 'og:description', content: 'Creative clothing and accessories for men, women, children, pets, and everything in between.' },
      // { property: 'og:url', content: 'https://tai-dye-studios.com' },
      // {property: 'og:image', content: 'https://tai-dye-studios.com/favicon.ico'},
    ])
  }

}
