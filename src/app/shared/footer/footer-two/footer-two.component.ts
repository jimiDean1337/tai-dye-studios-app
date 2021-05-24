import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/core/services/data/data.service';

@Component({
  selector: 'app-footer-two',
  templateUrl: './footer-two.component.html',
  styleUrls: ['./footer-two.component.scss']
})
export class FooterTwoComponent implements OnInit {

  @Input() class: string;
  @Input() themeLogo: string = 'assets/images/icon/logo.png'; // default Logo
  @Input() mainFooter: boolean = true; // Default true
  @Input() subFooter: boolean = false; // Default false

  public today: number = Date.now();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  addSubscriber(email: string) {
    this.dataService.addSubscriber(email);
  }

}
