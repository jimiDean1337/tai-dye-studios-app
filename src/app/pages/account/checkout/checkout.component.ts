import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

  /* TODO:  Get user account */
  /* TODO:  Set up Stripe Payments */
  /* TODO:  Set up Paypal Payments */
  /* TODO:  Set up Credit/Debit Payments */


export class CheckoutComponent implements OnInit {

  constructor(public title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Checkout - Tai-Dye Studios | Creative Clothing &amp; Accessories')
  }

}
