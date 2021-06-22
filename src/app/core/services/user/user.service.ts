import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { UserAccount, UserOrderHistory, UserProfile, USER_PROFILE_DEFAULTS } from 'src/app/shared/classes/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  UserProfile: Observable<UserProfile>;
  UserAccount: Observable<UserAccount>;
  UserOrderHistory: Observable<UserOrderHistory>
  private userCollection: AngularFirestoreCollection<any>;
  constructor(private afs: AngularFirestore, private toastr: ToastrService) {
    this.userCollection = this.afs.collection<UserProfile>('users');
  }

  private get users(): Observable<UserProfile[]> {
    return this.userCollection.valueChanges({ idField: true });
  }

  public addUserOrder(userId: string, data: any) {
    return this.afs.collection('users').doc(userId).collection('orders').add(data);
  }

  public getUserById(userId: string): Observable<any> {
    return this.UserProfile = this.userCollection
      .valueChanges({ idField: true })
      .pipe(
        map((users: UserProfile[]) => {
          return users.filter((user: UserProfile) => user.id === userId)[0]
        })
      )
  }

  public checkIfUserExists(userId: string) {
    return this.users.pipe(map(users => {
      return users.filter((user: UserProfile) => user.id === userId).length > 0;
    }))
  }

  public createNewUser(id: string, data: UserProfile): Promise<void> {
    data.id = id;
    console.log('user created', data)
    return this.userCollection.doc(id).set({ ...USER_PROFILE_DEFAULTS, ...data })
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
    return this.userCollection.doc(id).set({ ...data }, {merge: true})
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
