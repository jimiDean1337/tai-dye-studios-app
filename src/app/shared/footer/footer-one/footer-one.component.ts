import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/core/services/data/data.service';
import { WebsiteContactInfo } from '../../data/support.data';

@Component({
  selector: 'app-footer-one',
  templateUrl: './footer-one.component.html',
  styleUrls: ['./footer-one.component.scss']
})
export class FooterOneComponent implements OnInit {

  @Input() class: string = 'footer-light' // Default class
  @Input() themeLogo: string = 'assets/images/icon/logo-shirt_230x93.png' // Default Logo
  @Input() newsletter: boolean = true; // Default True

  public contactInfo = WebsiteContactInfo;
  public today: number = Date.now();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  addSubscriber(email: string) {
    this.dataService.addSubscriber(email);
  }

}
