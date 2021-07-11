import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/core/services/data/data.service';
import { WebsiteContactInfo } from '../../data/support.data';

@Component({
  selector: 'app-footer-three',
  templateUrl: './footer-three.component.html',
  styleUrls: ['./footer-three.component.scss']
})
export class FooterThreeComponent implements OnInit {

  @Input() class: string; // Default class
  @Input() mainFooter: boolean = true; // Default true
  @Input() subFooter: boolean = false; // Default false
  @Input() themeLogo: string = 'assets/images/icon/logo.png'; // Default Logo

  public contactInfo = WebsiteContactInfo;
  public today: number = Date.now();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  addSubscriber(email: string) {
    this.dataService.addSubscriber(email);
  }

}
