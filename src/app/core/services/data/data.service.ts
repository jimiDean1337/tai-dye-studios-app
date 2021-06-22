import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Coupon } from 'src/app/shared/classes/coupon';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  UsedCoupons: AngularFirestoreCollection<any>;
  Subscribers: AngularFirestoreCollection<any>;
  Contacts: AngularFirestoreCollection<any>;
  ProductReviews: AngularFirestoreCollection<any>;
  Orders: AngularFirestoreCollection<any>;
  constructor(private afs: AngularFirestore, private toastr: ToastrService) {}

  private get usedCoupons() {
    return this.UsedCoupons = this.afs.collection<any>('coupons');
  }
  private get subscribers() {
    return this.Subscribers = this.afs.collection<any>('subscribers');
  }

  private get contacts() {
    return this.Contacts = this.afs.collection<any>('contacts');
  }

  private get productReviews() {
    return this.Contacts = this.afs.collection<any>('product-reviews');
  }

  private get orders() {
    return this.Orders = this.afs.collection<any>('orders');
  }

  public addUsedCoupons(code: string) {
    return this.usedCoupons.add(code);
  }

  public addSubscriber(email: string) {
    // TODO: Add FormBuilder to component for validation
    const data = {
      timestamp: new Date(),
      email: email.toLowerCase()
    }
    return this.testString(email) ? this.subscribers.add(data).then(() => {
      this.toastr.success('Subscribed to Newsletter!');
    }) : () => {
      this.toastr.error('Email was not valid, try again.')
      return Promise.reject();
    };
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
    data.timestamp = new Date();
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
