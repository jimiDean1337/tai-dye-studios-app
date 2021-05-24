import {
  Component, OnInit, OnDestroy, ViewChild, TemplateRef, Input,
  Injectable, PLATFORM_ID, Inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PRIVACY_POLICY, TERMS_OF_USE } from 'src/app/shared/data/legal.docs';

@Component({
  selector: 'app-legal-docs',
  templateUrl: './legal-docs.component.html',
  styleUrls: ['./legal-docs.component.scss']
})
export class LegalDocsComponent implements OnInit, OnDestroy {
  @ViewChild('legalDocs', { static: false }) LegalDocs: TemplateRef<any>;
  @Input() docType: string;

  public docs = {
    privacy: PRIVACY_POLICY,
    terms: TERMS_OF_USE
  }
  modalOpen: boolean = false;
  closeResult: string;
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openModal() {
    this.modalOpen = true;
    if (isPlatformBrowser(this.platformId)) { // For SSR
      this.modalService.open(this.LegalDocs, {
        size: 'lg',
        ariaLabelledBy: 'Legal-Docs-Modal',
        centered: true,
        windowClass: 'Quickview'
      }).result.then((result) => {
        `Result ${result}`
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
