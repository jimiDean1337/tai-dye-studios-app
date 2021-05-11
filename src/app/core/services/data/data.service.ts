import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  Subscribers: AngularFirestoreCollection<any>;
  Contacts: AngularFirestoreCollection<any>;
  constructor(private afs: AngularFirestore) {


  }

  private get subscribers() {
    return this.Subscribers = this.afs.collection<any>('subscribers');
  }

  private get contacts() {
    return this.Contacts = this.afs.collection<any>('contacts');
  }

  public addSubscriber(data: any) {
    data.timestamp = new Date();
    this.subscribers.add(data);
    return true;
  }

  public addContact(data: any) {
    data.timestamp = new Date();
    this.contacts.add(data);
    return true;
  }
}
