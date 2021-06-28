import { Component, OnInit, Input, HostListener } from '@angular/core';
import { WebsiteContactInfo } from '../../data/support.data';

@Component({
  selector: 'app-header-four',
  templateUrl: './header-four.component.html',
  styleUrls: ['./header-four.component.scss']
})
export class HeaderFourComponent implements OnInit {

  @Input() class: string = 'header-2 header-6';
  @Input() themeLogo: string = 'assets/images/icon/logo--shirt_230x93.png'; // Default Logo
  @Input() topbar: boolean = true; // Default True
  @Input() sticky: boolean = false; // Default false
  public contactInfo = WebsiteContactInfo;

  public stick: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number >= 150 && window.innerWidth  > 400) {
      this.stick = true;
    } else {
      this.stick = false;
    }
  }

}
