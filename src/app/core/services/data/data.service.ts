import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { filter, map, skipWhile, switchMap, takeUntil, takeWhile } from 'rxjs/operators';
import { Coupon } from 'src/app/shared/classes/coupon';
import { Order } from 'src/app/shared/classes/order';

export interface Subscriber { timestamp: any, email: string }

@Injectable({
  providedIn: 'root'
})
export class DataService {
  UsedCoupons: AngularFirestoreCollection<any>;
  Subscribers: AngularFirestoreCollection<any>;
  Contacts: AngularFirestoreCollection<any>;
  ProductReviews: AngularFirestoreCollection<any>;
  Orders: AngularFirestoreCollection<any>;

  Products: any;
  Coupons: any;
  constructor(private afs: AngularFirestore, private db: AngularFireDatabase, private toastr: ToastrService) {}

  private get usedCoupons() {
    return this.UsedCoupons = this.getCollectionByName<any>('coupons');
  }
  private get subscribers() {
    return this.Subscribers = this.getCollectionByName<Subscriber>('subscribers');
  }

  private get contacts() {
    return this.Contacts = this.getCollectionByName<any>('contacts');
  }

  private get productReviews() {
    return this.Contacts = this.getCollectionByName<any>('product-reviews');
  }

  private get orders() {
    return this.Orders = this.getCollectionByName<Order>('orders');
  }

  private get coupons() {
    return this.Coupons = this.db.list<Coupon>('coupons'); /* Get Products from Firebase RT Database */
  }

  // private getDocumentById<T = any>(collection: string, docId: string) {
  //   return this.afs.collection<T>(collection).doc<T>(docId);
  // }

  // private getDbObject<T = any>() {

  // }

  public getCollectionByName<T = any>(name: string) {
    return this.afs.collection<T>(name);
  }

  public getDbListByName<T = any>(name: string) {
    return this.db.list<T>(name);
  }

  public getCoupons() {
    return this.coupons.valueChanges();
  }

  public addUsedCoupons(code: string) {
    return this.usedCoupons.add({coupon: code});
  }

  public addSubscriber(email: string) {
    // TODO: Add FormBuilder to component for validation
    return this.subscribers
      .valueChanges()
      .pipe(
        map(subscribers => subscribers.map(subscriber => subscriber.email)),
        map(emails => emails.includes(email)),
        map(exists => {
          if (exists) return false;
          if (!exists) {
            console.log('Adding Subscriber')
            const data = {
              timestamp: new Date(),
              email: email.toLowerCase()
            }
            this.subscribers.add(data).then(() => this.toastr.success('You are subscribed!'));
            return true;
          }
        })
      )
  }

  public addContact(data: any) {
    data.timestamp = new Date();
    data.email = String(data.email).toLowerCase()
    return this.contacts.add(data).then(() => {
      this.toastr.success('Your message was Sent!')
    }).catch(error => {
      this.toastr.error('Something went wrong, try again.')
    });
  }

  public addOrder(data: any) {
    // data.timestamp = new Date();
    return this.orders.add(data).then(() => {
      this.toastr.success('Your Order was Sent!')
    }).catch(error => {
      this.toastr.error('Your Order Failed, try again.')
    });
  }

  public addProductReview(productId: string, data: any) {
    return this.productReviews.doc(productId).collection('reviews').add(data).then(() => {
      this.toastr.success('Your review was posted!')
    }).catch(error => {
      this.toastr.error('Your Review Failed, try again.')
    });
  }

  private testString(str: string) {
    const stringRegex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
    return stringRegex.test(str);
  }
}
