import { Component, OnInit, Input, HostListener } from '@angular/core';
import { WebsiteContactInfo } from '../../data/support.data';

@Component({
  selector: 'app-header-two',
  templateUrl: './header-two.component.html',
  styleUrls: ['./header-two.component.scss']
})
export class HeaderTwoComponent implements OnInit {

  @Input() class: string;
  @Input() themeLogo: string = 'assets/images/icon/logo.png'; // Default Logo
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
    if (number >= 150 && window.innerWidth > 400) {
      this.stick = this.sticky ? true:false;
    } else {
      this.stick = this.sticky ? false:true;
    }
  }

}
