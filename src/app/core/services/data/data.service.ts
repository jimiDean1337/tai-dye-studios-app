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
  constructor(private afs: AngularFirestore, private toastr: ToastrService) {}

  private get subscribers() {
    return this.Subscribers = this.afs.collection<any>('subscribers');
  }

  private get contacts() {
    return this.Contacts = this.afs.collection<any>('contacts');
  }

  public addSubscriber(email: string) {
    const data = {
      timestamp: new Date(),
      email
    }
    return this.subscribers.add(data).then(success => {
      this.toastr.success('Subscribed to Newsletter!');
      // localStorage.setItem('newsletter', 'true')
    });
  }

  public addContact(data: any) {
    data.timestamp = new Date();
    return this.contacts.add(data).then(success => {
      this.toastr.success('Contact Form Sent!')
    });
  }
}
