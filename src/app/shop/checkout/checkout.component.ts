import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from '../../../environments/environment';
import { Product } from "../../shared/classes/product";
import { ProductService } from "../../shared/services/product.service";
import { OrderService } from "../../shared/services/order.service";
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserProfile } from 'src/app/shared/classes/user';
import { map, scan } from 'rxjs/operators';


const state = {
  subTotal: JSON.parse(localStorage['subTotal'] || '{}'),
  localPickup: JSON.parse(localStorage['localPickup'] || 'false'),
}
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('paypal', { static: true }) Paypal: any;
  public checkoutForm: FormGroup;
  public couponCode = new FormControl('', Validators.nullValidator);
  public localPickup = new FormControl(false, Validators.nullValidator);
  public products: Product[] = [];
  public payPalConfig: IPayPalConfig;
  public payment: string = 'Paypal';
  public shippingOptions: any = this.productService.Shipping;
  User: UserProfile;
  loadingPaymentConfig: boolean;
  paymentConfigProgress: number;
  paypalLoadingProgress: number = 0;
  paypalLoading: boolean = false;
  paypalLoadingComplete: boolean;
  constructor(private fb: FormBuilder,
    private ngZone: NgZone,
    public title: Title,
    public productService: ProductService,
    private orderService: OrderService) {
    this.checkoutForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(50)]],
      country: ['', Validators.required],
      town: ['', Validators.required],
      state: ['', Validators.required],
      postalcode: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    // this.userService.UserProfile.subscribe(user => {
    //   console.log('User', user)
    //   user = this.User
    // })
    let quantity = 0;
    this.title.setTitle('Checkout - Tai-Dye Studios | Creative Clothing & Accessories')
    this.productService.cartItems
      .subscribe(response => this.products = response)
    this.initPaypalConfig();
    this.localPickup.valueChanges.subscribe(val => {
      localStorage.setItem('localPickup', JSON.stringify(val))
    })
  }

  // Get products cost
  public get getSubTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  // Get state sales tax
  public get getSalesTax(): Observable<number> {
    return this.productService.cartSalesTax();
  }

  // Get shipping cost
  public get getShippingTotal(): Observable<number> {
    return this.productService.cartShippingTotal();
  }

  // Get total cost of items, shipping, and tax
  public get getGrandTotal(): Observable<number> {
    return forkJoin({
      subTotal: this.getSubTotal,
      salesTax: this.getSalesTax,
      shippingTotal: this.getShippingTotal
    }).pipe(map((val) => {
      return val.subTotal + val.salesTax + val.shippingTotal;
    }))
  }

// Validate and return coupon
  public runCoupon(couponCode: string) {
    this.productService.addCoupon(couponCode);
  }

  // Get discount amount
  public getAmountSaved() {
    return forkJoin({
      subTotal: this.getSubTotal,
      coupon: this.productService.coupon
    }).pipe(map(next => {
      const coupon = next.coupon;
      const type = coupon.type;
      const discount = coupon.discount;
      const subTotal = next.subTotal;
      let qty = 0;
      this.productService.cartItems.subscribe(products => {
        products.map(product => {
          qty += product.quantity;
        })
      })
      return type === 'PERCENTAGE' ? +Number((subTotal * discount)).toFixed(2) : type === 'SHIPPING' ? +Number(2.50 + (2.5 * qty)).toFixed(2) : +Number(discount).toFixed(2);
    }))

  }

// Remove coupon
  public removeCoupon() {
    this.productService.removeCoupon();
  }

  // Stripe Payment Gateway
  /* stripeCheckout() {
    var handler = (<any>window).StripeCheckout.configure({
      key: environment.stripe_token, // publishble key
      locale: 'auto',
      token: (token: any) => {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        this.orderService.createOrder(this.products, this.checkoutForm.value, token.id, this.subTotal);
      }
    });
    handler.open({
      name: 'Tai-Dye-Studios',
      description: 'Creative Apparel Online Store',
      amount: this.subTotal * 100
    })
  } */

  // Paypal Payment Gateway Default
  private initPaypalConfig(): void {
    this.checkoutForm.valueChanges.subscribe(shippingDetails => {
      // console.log('CheckoutForm Details', shippingDetails)
      forkJoin({
        subTotal: this.getSubTotal,
        salesTax: this.getSalesTax,
        shippingTotal: this.getShippingTotal,
      }).subscribe(next => {
        // console.log('All Current Values', next)
        localStorage.setItem('subTotal', JSON.stringify(next.subTotal));
        if (!this.localPickup.value && next.subTotal < 99) {
          next.shippingTotal = next.shippingTotal + 2.5;
        }
        const grandTotal = +Number(next.subTotal + next.salesTax + next.shippingTotal).toFixed(2);
        // console.log('Paypal', grandTotal, next.subTotal, next.salesTax, next.shippingTotal)
        this.payPalConfig = {
            currency: this.productService.Currency.currency,
            clientId: environment.paypal_token,
            createOrderOnClient: (data) => < ICreateOrderRequest > {
              intent: 'CAPTURE',
              application_context: {
                payment_method: {
                  payee_preferred: 'IMMEDIATE_PAYMENT_REQUIRED',
                  payer_selected: 'PAYPAL'
                }
              },
              payer: {
                email_address: shippingDetails.email,
              },
              purchase_units: [{
                  amount: {
                    currency_code: this.productService.Currency.currency,
                    value: `${grandTotal}`,
                  breakdown: {
                    shipping: {
                      currency_code: this.productService.Currency.currency,
                      value: Number(next.shippingTotal).toFixed(2)
                    },
                    tax_total: {
                      currency_code: this.productService.Currency.currency,
                      value: Number(next.salesTax).toFixed(2)
                    },
                    item_total: {
                        currency_code: this.productService.Currency.currency,
                        value: Number(next.subTotal).toFixed(2)
                    }
                    }
                  }
              }]
          },
            advanced: {
              commit: 'true',
              extraQueryParams: []
            },
          style: {
                color: 'blue',
                label: 'pay',
                layout: 'vertical',
                size:  'responsive',
                shape: 'rect',
          },

            onApprove: (data, actions) => {
              // console.log('onApprove - transaction was approved, but not authorized', data, actions);
              // actions.order.get().then(details => {
              //   console.log('onApprove - you can get full order details inside onApprove: ', details);
              // }).catch(err => console.log('ERROR -order.get!', err));
              return actions.order.capture()
                .then((orderDetails: any) => {
                  // console.log('onApprove - capture: ', orderDetails)
                  this.ngZone.run(() => {
                    this.orderService.createOrder(this.products, shippingDetails, data.orderID, next.subTotal, grandTotal, next.salesTax, next.shippingTotal, this.localPickup.value, orderDetails, this.productService.Coupon);
                  })
              }).catch(err => console.log('ERROR -order.capture!', err));
            },
            onClientAuthorization: (data) => {
                // console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            },
            onCancel: (data, actions) => {
                console.log('OnCancel', data, actions);
            },
            onError: err => {
                console.log('OnError', err);
            },
            onClick: (data, actions) => {
                console.log('onClick', data, actions);
            }
        };
      })
    })
  }

}
