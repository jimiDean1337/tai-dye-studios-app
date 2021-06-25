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
  @ViewChild('alertModal', { static: true }) AlertModal: TemplateRef<any>;
  @Input() type: string;
  @Input() class: string = 'exit-modal';
  @Input() content: any = `<p>Are you sure?</p>`;
  @Input() buttonOptions?: any = {
    resolve: {
      value: 'OK',
      icon: ''
    },
    reject: {
      value: 'Cancel',
      icon: ''
    }
  }
  public modalOpen: boolean = false;
  public closeResult: string;
  modalRef: Promise<void>;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private cookies: CookiesService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  public openModal() {
    console.log(`Modal Opening`);
    if (isPlatformBrowser(this.platformId)) { // For SSR
      console.log(`Modal Open`);
      return this.modalRef = this.modalService.open(this.AlertModal, {
        size: 'lg',
        ariaLabelledBy: 'Alert-Modal',
        centered: true,
        backdrop: 'static',
        windowClass: ''
      }).result.then((result) => {
        return result;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      })
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
