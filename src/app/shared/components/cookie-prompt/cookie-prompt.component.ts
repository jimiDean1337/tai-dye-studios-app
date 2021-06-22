import { Component, OnInit, ViewChild } from '@angular/core';

import { CookiesService } from 'src/app/core/services/cookies/cookies.service';
import { LegalDocsComponent } from '../modal/legal-docs/legal-docs.component';

@Component({
  selector: 'app-cookie-prompt',
  templateUrl: './cookie-prompt.component.html',
  styleUrls: ['./cookie-prompt.component.scss']
})
export class CookiePromptComponent implements OnInit {
  @ViewChild('privacyDocsModal') PrivacyDocsModal: LegalDocsComponent;
  @ViewChild('userTermsDocsModal') UserTermsDocsModal: LegalDocsComponent;
  show: boolean = true;

  constructor(private cookiesService: CookiesService) { }
// TODO: Finish Cookie consent component
  ngOnInit(): void {
    this.show = this.cookiesService.init();
    this.cookiesService.setCookieConsent();

  }

  allow() {
    this.show = false;
  }

}
