import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Coupon } from '../classes/coupon';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  Coupons: Observable<Coupon[]>;

  constructor(private http: HttpClient, private db: AngularFireDatabase) { }

  private get coupons() {
    // this.Coupons = this.http.get<Coupon[]>('assets/data/coupons.json').pipe(map(data => data));
    this.Coupons = this.db.list<Coupon>('coupons').valueChanges(); /* Get Products from Firebase RT Database */
    return this.Coupons = this.Coupons.pipe(map(coupons => coupons.filter(coupon => coupon.expiresOn > new Date() || coupon.expiresOn === 'never')))
  }

  private getCoupons() {
    return this.coupons;
  }

  public validateCoupon(couponCode: Coupon['code']) {
    // console.log('Validating Coupon', couponCode)
    return this.getCoupons()
      .pipe(
        map((coupons: any) => {
          return coupons.filter((coupon: Coupon) => coupon.code === couponCode)
        })
      )
  }

  applyCoupon(price: number, type: Coupon['type'], discount: number) {
    // console.log('Applying Coupon', discount, price, type)
    if (type === 'CASH') {
      return price - discount;
    }
    return price - (price * discount);
  }
}
