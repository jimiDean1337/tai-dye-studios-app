import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from '../../../environments/environment';
import { Product } from "../../shared/classes/product";
import { ProductService } from "../../shared/services/product.service";
import { OrderService } from "../../shared/services/order.service";
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserProfile } from 'src/app/shared/classes/user';
import { map, scan, take } from 'rxjs/operators';
import { CookiesService } from 'src/app/core/services/cookies/cookies.service';

// const state = {
//   subTotal: JSON.parse(localStorage['subTotal'] || '{}'),
//   localPickup: JSON.parse(localStorage['localPickup'] || 'false'),
// }

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('paypal', { static: true }) Paypal: any;
  public checkoutForm: FormGroup;
  public couponCode: FormControl = new FormControl('');
  public localPickup: FormControl = new FormControl(false);
  public useDefaultShippingAddress: FormControl = new FormControl(false);
  public products: Product[] = [];
  public payPalConfig: IPayPalConfig;
  public payment: string = 'Paypal';
  public shippingDetails: BehaviorSubject<any>;
  public paypalLoading: boolean = false;
  constructor(private fb: FormBuilder,
    private ngZone: NgZone,
    public title: Title,
    public productService: ProductService,
    private userService: UserService,
    private cookies: CookiesService,
    private orderService: OrderService) {
    this.shippingDetails = new BehaviorSubject(null)
    this.checkoutForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      email: ['', [Validators.required, Validators.email]],
      street: ['', [Validators.required, Validators.maxLength(50)]],
      country: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    const couponSet = localStorage.getItem('coupon');
    if (couponSet) {
      this.couponCode.patchValue(couponSet);
      this.runCoupon(couponSet);
    }
    let quantity = 0;
    this.title.setTitle('Checkout - Tai-Dye Studios | Creative Clothing & Accessories')
    this.productService.cartItems
      .subscribe(response => this.products = response)
      this.localPickup.valueChanges.subscribe(val => {
        localStorage.setItem('localPickup', JSON.stringify(val))
      })
    this.updateShippingInfo(true)
    this.initPaypalConfig();
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

  public get getCustomerShippingAddress() {
    const userId = this.cookies.getCookieVal('USER_ID');
    return this.userService.getUserById(userId)
      .valueChanges()
      .pipe(map(user => {
        return {
          firstname: user.fName,
          lastname: user.lName,
          phone: user.phone,
          email: user.email,
          street: user.address.street,
          country: user.address.country,
          city: user.address.city,
          state: user.address.stateOrProvince,
          zipcode: user.address.zipcode
        }
      // console.log('User', user)
    })
    )
  }

  public changeShippingInfo(event: any) {
    console.log(event)
  }

  public updateShippingInfo(useDefault: boolean, formValue?: any) {
    this.useDefaultShippingAddress.patchValue(useDefault)
    if (useDefault) {
      this.getCustomerShippingAddress.subscribe(details => this.shippingDetails.next(details));
    } else {
      this.shippingDetails.next(formValue)
    }
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
      return coupon.save;
    }))

  }

// Remove coupon
  public removeCoupon() {
    this.couponCode.reset();
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
  private initPaypalConfig() {
    this.paypalLoading = true;
    setTimeout(() => {
      // forkJoin([this.getSubTotal, this.getSalesTax, this.getShippingTotal, this.productService.coupon]).pipe(map(next => { console.log('ForkJoin Array', next) })).subscribe()
        forkJoin({
          subTotal: this.getSubTotal,
          salesTax: this.getSalesTax,
          shippingTotal: this.getShippingTotal,
          coupon: this.productService.coupon
        }).subscribe(next => {
          const grandTotal = +Number(next.subTotal + next.salesTax + next.shippingTotal).toFixed(2);

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
                return actions.order.capture()
                  .then((orderDetails: any) => {
                    // console.log('onApprove - capture: ', orderDetails)
                    this.ngZone.run(() => {
                      this.orderService.createOrder(this.products, this.shippingDetails.getValue(), data.orderID, next.subTotal, grandTotal, next.salesTax, next.shippingTotal, this.localPickup.value, orderDetails, this.productService.Coupon);
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
      this.paypalLoading = false;
    }, 4000)

  }

}
