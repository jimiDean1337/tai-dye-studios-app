import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  activeIds = 'faq-1';
  faqBlock = [
    {
      id: 'faq-1',
      title: 'How can I find out about my order status?',
      content: `<p>Not only will you be redirected to an "Order Success" page after completing checkout, but we will also email an order confirmation to the email you enter under "Shipping Details" during checkout. However, anytime you have a question about an order you have placed, don't hesitate to either message us using the Facebook Messenger chat  at the bottom right of the screen, or email us at <a href="mailto:orders@tai-dye-studios.com">order@tai-dye-studios.com</a>. Both options will get you answers, we promise.</p>`
    },
    {
      id: 'faq-2',
      title: 'How can I find out about my order status?',
      content: `<p>Not only will you be redirected to an "Order Success" page after completing checkout, but we will also email an order confirmation to the email you enter under "Shipping Details" during checkout.</p><p>However, anytime you have a question about an order you have placed, don't hesitate to either message us using the Facebook Messenger chat <i class="text-info fa fa-messenger></i> at the bottom right of the screen, or email us at <a href="mailto:orders@tai-dye-studios.com">order@tai-dye-studios.com</a>. Both options will get you answers, we promise.</p>`
    },
    {
      id: 'faq-3',
      title: 'How can I find out about my order status?',
      content: `<p>Not only will you be redirected to an "Order Success" page after completing checkout, but we will also email an order confirmation to the email you enter under "Shipping Details" during checkout.</p><p>However, anytime you have a question about an order you have placed, don't hesitate to either message us using the Facebook Messenger chat <i class="text-info fa fa-messenger></i> at the bottom right of the screen, or email us at <a href="mailto:orders@tai-dye-studios.com">order@tai-dye-studios.com</a>. Both options will get you answers, we promise.</p>`
    },
  ]
  constructor(public title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('FAQ - Tai-Dye Studios | Creative Clothing & Accessories')
  }

}
