import { Component, OnInit, Input } from '@angular/core';
import { WebsiteContactInfo } from '../../data/support.data';

@Component({
  selector: 'app-footer-four',
  templateUrl: './footer-four.component.html',
  styleUrls: ['./footer-four.component.scss']
})
export class FooterFourComponent implements OnInit {

  @Input() class: string = 'footer-light' // Default class
  @Input() themeLogo: string = 'assets/images/icon/logo-shirt_230x93.png' // Default Logo

  public today: number = Date.now();

  public contactInfo = WebsiteContactInfo;

  constructor() { }

  ngOnInit(): void {
  }

}
