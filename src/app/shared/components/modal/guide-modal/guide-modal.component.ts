import {
  Component, OnInit, OnDestroy, ViewChild, TemplateRef, Input, AfterViewInit,
  Injectable, PLATFORM_ID, Inject, ElementRef
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CookiesService } from 'src/app/core/services/cookies/cookies.service';

@Component({
  selector: 'app-guide-modal',
  templateUrl: './guide-modal.component.html',
  styleUrls: ['./guide-modal.component.scss']
})
export class GuideModalComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("guideModal") GuideModal: TemplateRef<any>;
  @Input() modalId?: string;
  @Input() type?: string;
  @Input() cookie?: string;
  @Input() modalOptions?: NgbModalOptions;
  @Input() textOrTemplate: string | HTMLElement | TemplateRef<any> | ElementRef<any>;
  public closeResult: string;
  public modalOpen: boolean = false;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private cookies: CookiesService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // if (!this.cookies.checkCookie(this.cookie) || this.cookies.getCookieVal(this.cookie) === 'false') {
    //   this.openModal();
    // }
  }

  openModal() {
    if (isPlatformBrowser(this.platformId)) { // For SSR
      this.modalOpen = true;
      return this.modalService.open(this.GuideModal, {
        ...this.modalOptions
      }).result.then((result) => {
        console.log('Modal Result', result)
        // this.cookies.setCookieVal(this.cookie, result);
        return result;
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
