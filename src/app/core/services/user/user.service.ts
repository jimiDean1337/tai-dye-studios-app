import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Order } from 'src/app/shared/classes/order';
import { UserAccount, UserOrderHistory, UserProfile, USER_PROFILE_DEFAULTS } from 'src/app/shared/classes/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private Users: AngularFirestoreCollection<any>;
  constructor(private afs: AngularFirestore, private toastr: ToastrService) {
  }

  private get users() {
    return this.Users = this.afs.collection<UserProfile>('users');
  }

  public deleteUser(userId: string) {
    return this.getUserById(userId).delete();
  }

  public addUserOrder(userId: string, data: Order) {
    return this.afs.collection('users').doc(userId).collection<Order>('orders').add(data);
  }

  public getUserById(userId: string) {
    return this.afs.collection<UserProfile>('users').doc(userId);
  }

  public getUserCollectionByName(userId: string, collectionName: string) {
    return this.afs.collection(`users`).doc(userId).collection(collectionName);
  }

  public checkIfUserExists(userId: string) {
    return this.users.valueChanges({ idField: true }).pipe(map(users => {
      return users.filter((user: UserProfile) => user.id === userId).length > 0;
    }))
  }

  public checkForUserByEmail(email: string) {
    return this.afs.collection<UserProfile>('users').valueChanges()
      .pipe(
        map(users => users.filter(user => user.email === email)),
        map(users => !!users.length)
    )
  }

  resetPassword(email: string) {
    return this.afs.collection('password-resets').add({ email, timestamp: new Date() })
  }

  public createNewUser(id: string, data: UserProfile): Promise<void> {
    data.id = id;
    // console.log('user created', data)
    return this.users.doc(id).set({ ...USER_PROFILE_DEFAULTS, ...data })
  }

  public createNewUserFromProvider(id: string, provider: string, providerData: any) {
    let data: any;
    if (provider === 'google') {
      data = this.createUserFromGoogleProvider(id, providerData.user, providerData.additionalUserInfo)
    } else if (provider === 'facebook') {
      data = this.createUserFromFacebookProvider(id, providerData.user, providerData.additionalUserInfo);
    }
    return this.createNewUser(id, data);
  }

  public updateUserProfile(id: string, data: UserProfile) {
    return this.users.doc(id).set({ ...data }, {merge: true})
      .then(() => {
      this.toastr.success('Profile Updated!')
    })
      .catch(error => this.errorHandler(error, 'Could not update! Try again.'))
  }

  private createUserFromGoogleProvider(id: string, user: any, additionalUserInfo: any): UserProfile {
    return {
      id,
      providerType: 'Google',
      email: user.email,
      emailVerified: user.emailVerified,
      fName: additionalUserInfo.profile.given_name,
      lName: additionalUserInfo.profile.family_name,
      displayName: user.displayName,
      phone: user.phoneNumber,
      photoURL: user.photoURL,
      creationDate: user.metadata.creationTime,
    }
  }

  private createUserFromFacebookProvider(id: string, user: any, additionalUserInfo: any): UserProfile {
    return {
      id,
      providerType: 'Facebook',
      email: user.email,
      emailVerified: user.emailVerified,
      fName: additionalUserInfo.profile.first_name,
      lName: additionalUserInfo.profile.last_name,
      displayName: user.displayName,
      phone: user.phoneNumber,
      photoURL: user.photoURL,
      creationDate: user.metadata.creationTime,
    }
  }

  private errorHandler(error, msg?: string) {
    return this.toastr.error(`Uh oh! ${error.message ? error.message : msg ? msg:'Error, try again.'}.`)
  }
}
