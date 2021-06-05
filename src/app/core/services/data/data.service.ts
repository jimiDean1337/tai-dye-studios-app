import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  Subscribers: AngularFirestoreCollection<any>;
  Contacts: AngularFirestoreCollection<any>;
  ProductReviews: AngularFirestoreCollection<any>;
  constructor(private afs: AngularFirestore, private toastr: ToastrService) {}

  private get subscribers() {
    return this.Subscribers = this.afs.collection<any>('subscribers');
  }

  private get contacts() {
    return this.Contacts = this.afs.collection<any>('contacts');
  }

  private get productReviews() {
    return this.Contacts = this.afs.collection<any>('product-reviews');
  }

  public addSubscriber(email: string) {
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
    data.email = data.email.toLowercase()
    return this.testString(data.email) ? this.contacts.add(data).then(() => {
      this.toastr.success('Your message was Sent!')
    }) : () => {
      this.toastr.error('Your email was not valid, try again.')
      return Promise.reject();
    };
  }

  public addProductReview(productId: string, data: any) {
    return this.productReviews.doc(productId).collection('reviews').add(data).then(() => {
      this.toastr.success('Your review was posted!')
    });
  }

  private testString(str: string) {
    const stringRegex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
    return stringRegex.test(str);
  }
}
