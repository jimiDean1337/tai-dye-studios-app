import {
  Component, OnInit, OnDestroy, ViewChild, TemplateRef, Input,
  Injectable, PLATFORM_ID, Inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CookiesService } from 'src/app/core/services/cookies/cookies.service';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {
  @ViewChild('alertModal', { static: false }) ProfileHelper: TemplateRef<any>;
  @Input() type: string = 'helper';
  public modalOpen: boolean = false;
  closeResult: string;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private cookies: CookiesService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (!this.cookies.checkCookie('ORIENTATION_COMPLETE')) {
      this.openModal()
    }
  }

  openModal() {
    console.log(`Modal Opening`);
    if (isPlatformBrowser(this.platformId)) { // For SSR
      console.log(`Modal Open`);
      this.modalService.open(this.ProfileHelper, {
        size: 'xl',
        ariaLabelledBy: 'Profile-Helper-Modal',
        centered: true,
        windowClass: 'QuickView'
      }).result.then((result) => {
        console.log(`Modal Result ${result}`);
        this.cookies.setCookieVal('ORIENTATION_COMPLETE', 'true');
        this.modalOpen = true;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnDestroy() {
    if (this.modalOpen) {
      this.modalService.dismissAll();
    }
  }

}
