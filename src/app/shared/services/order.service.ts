import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookiesService } from 'src/app/core/services/cookies/cookies.service';
import { DataService } from 'src/app/core/services/data/data.service';
import { UserService } from 'src/app/core/services/user/user.service';

const state = {
  checkoutItems: JSON.parse(localStorage['checkoutItems'] || '[]')
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private router: Router, private userService: UserService, private dataService: DataService, private cookies: CookiesService) { }

  // Get Checkout Items
  public get checkoutItems(): Observable<any> {
    const itemsStream = new Observable(observer => {
      observer.next(state.checkoutItems);
      observer.complete();
    });
    return itemsStream;
  }

  // Create order
  public async createOrder(product: any, shippingDetails: any, orderId: any, subTotal: any, grandTotal: any, salesTax: any, shippingTotal: any, forPickup: boolean, orderDetails: any, coupon = null) {
    const userId: any = this.cookies.getCookieVal('USER_ID');
    const start_date = new Date();
    const orderDate = start_date.setDate(start_date.getDate())
    const estimatedDeliveryDate = start_date.setDate(start_date.getDate() + 3 * 7);
    const item = {
      orderDate,
      shippingDetails,
      estimatedDeliveryDate,
      product,
      orderId,
      subTotal,
      grandTotal,
      salesTax,
      shippingTotal,
      forPickup,
      orderDetails,
      coupon
    };
    state.checkoutItems = item;
    localStorage.setItem("checkoutItems", JSON.stringify(item));
    return await this.router.navigate(['/shop/checkout/success', orderId]).then(success => {
      if (success) {
        localStorage.removeItem("cartItems");
        localStorage.removeItem("subTotal");
        this.dataService.addOrder(item);
        this.userService.addUserOrder(userId, item)
        if (coupon) {
          this.dataService.addUsedCoupons(coupon.code);
        }
      }
    });
  }

}

/* TODO: Send order to firestore */
