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
      title: 'How do I find out about my order status?',
      content: `<p>Along with being redirected to an "Order Success" page after completing checkout that shows all your order details, but we will also email an order confirmation to the email you enter under "Shipping Details" during checkout. However, anytime you have a question about an order you have placed, don't hesitate to either message us using the Facebook Messenger chat <i class="text-info fab fa-facebook-messenger"></i> at the bottom right of the screen, or email us at <a href="mailto:orders@tai-dye-studios.com">Order@tai-dye-studios.com</a>. All you need is your order id and a question.</p>`
    },
    {
      id: 'faq-2',
      title: 'How do I return an order for replacement or refund?',
      content: `<h5>Refunds</h5><p>First, be sure to read our <a href="assets/data/user-terms.html#refunds" target="_blank">User Terms</a> which breifly explains our refund policy. If, after reading that, you have any further questions, you may contact us using the Facebook Messenger chat  <i class="fab fa-facebook-messenger text-info"></i> located on the bottom right of the screen, or email us at <a href="mailto:refunds@tai-dye-studios.com">Refunds@tai-dye-studios.com<a/>, as well as contact us using our contact form <a href="/pages/contact">here</a>. Be sure to include your <b>Order Id</b>.</p> <br><h5>Replacements</h5><p>Email our team at <a href="mailto:orders@tai-dye-studios.com">Orders@tai-dye-studios.com</a> with any questions about replacement items. Replacement items will be handled on a case-by-case basis. Replacing purchased items can be an alternative to a refund. Again, we recommend reading our <a href="assets/data/user-terms.html#refunds" target="_blank">User Terms</a>.</p>`
    },
    {
      id: 'faq-3',
      title: 'Where do I go for Local Pickup of my order?',
      content: `<p>If you selected the "<b>Local Pickup</b>" option during checkout, we will send you an email with details about how you can pickup your order. <br> For your convenience, as well as the safety of our customers and associates, you may choose the location to pickup your order. The chosen location must get approval from <b>Tai-Dye Studios</b> and must be within <b>25 miles</b> of Zanesvill, Ohio. If you do not live in the vacinity of Zanesville, it is highly recommended you have your order shipped to you.</p><p>You can contact us <a href="/pages/contact">here</a>, by email at <a href="mailto:orders@tai-dye-studios.com">Orders@tai-dye-studios.com</a>, or use the Facebook Messenger chat <i class="fab fa-facebook-messenger text-info"></i> at the bottom of the screen.</p>`
    },
    {
      id: 'faq-4',
      title: 'How do I delete my Customer Account?',
      content: `<p>It would break our hearts, but if you are determined to delete your <b>Tai-Dye Studios Customer Account</b>, email our support staff (without worry of a guilt trip) at <a href="mailto:support@tai-dye-studios.com">Support@tai-dye-studios.com</a>. <br>Before we can delete your account, you will need to verify your identity by providing either:</p><br><ul class="list-group"><li class="list-group-item"><span><i class="fa fa-lock"></i></span> &nbsp;A copy of your government issued ID</li> <li class="list-group-item"><span><i class="fa fa-lock"></i></span> &nbsp;Account email and password</li><li class="list-group-item"><span><i class="fa fa-lock"></i></span> &nbsp;Recent order history</li><li class="list-group-item"><span><i class="fa fa-lock"></i></span> &nbsp;Other secure account information</li></ul><br><p>In the future, we will make account deletion easier by the click of a button (and maybe just a little guilt).</p>`
    },
    {
      id: 'faq-5',
      title: 'Can\'t find your question in the faq?',
      content: `<p>Have a question or suggestion for our FAQ's? Send us a message <a href="/pages/contact">here</a>. Any and all feedback is very appreciated!</p>
      `
    },
    {
      id: 'faq-6',
      title: 'Where do I find the latest updates and sales?',
      content: `<p>This one is easy! Scroll down a tiny bit and find some text that says <b>"KNOW IT ALL FIRST!"</b>. Next to that you will find a field to enter your email. Go ahead and add your email then click '<b>SUBSCRIBE</b>'. You will recieve an email letting you know you've been signed up for updates, deals, cool content, our newsletter, and a ton of other stuff. If you havn't subscribed you better hurry up! <br><br><br></p><div class="text-center"><i class="fa fa-hand-o-down"></i> LOOK <i class="fa fa-hand-o-down"></i></div>`
    },
  ]
  constructor(public title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('FAQ - Tai-Dye Studios | Creative Clothing & Accessories')
  }

}
