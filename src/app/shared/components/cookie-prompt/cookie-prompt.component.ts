import { Component, OnInit, ViewChild } from '@angular/core';

import { CookiesService } from 'src/app/core/services/cookies/cookies.service';
import { LegalDocsComponent } from '../modal/legal-docs/legal-docs.component';

@Component({
  selector: 'app-cookie-prompt',
  templateUrl: './cookie-prompt.component.html',
  styleUrls: ['./cookie-prompt.component.scss']
})
export class CookiePromptComponent implements OnInit {
  @ViewChild('legalDocsModal') LegalDocsModal: LegalDocsComponent;
  show: boolean = true;

  constructor(private cookiesService: CookiesService) { }
// TODO: Finish Cookie consent component
  ngOnInit(): void {
    this.show = this.cookiesService.init();
  }

  allow() {
    this.cookiesService.setCookieConsent('true');
    this.show = false;
  }

  deny() {
    this.cookiesService.setCookieConsent('false');
    this.show = false;
  }

  openModal() {

  }

}
