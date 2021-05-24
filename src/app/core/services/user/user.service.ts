import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UserAccount, UserProfile, USER_PROFILE_DEFAULTS } from 'src/app/shared/classes/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  UserProfile: Observable<UserProfile>;
  UserAccount: Observable<UserAccount>;
  private userCollection: AngularFirestoreCollection<any>;
  constructor(private afs: AngularFirestore, private toastr: ToastrService) {
    this.userCollection = this.afs.collection<UserProfile>('users');
  }

  public getUserById(userId: string): Observable<any> {
    return this.UserProfile = this.userCollection
      .valueChanges({ idField: true })
      .pipe(
        map((users: UserProfile[]) => {
          const results = users.filter((user: UserProfile) => user.id === userId)[0];
          return results;
        })
      )
  }

  public createNewUser(id: string, data: UserProfile) {
    data.id = id;
    return this.userCollection.doc(id).set({ ...USER_PROFILE_DEFAULTS, ...data , options: {}})
  }

  // public signout() {
  //   this.UserProfile = new Observable(observer => {
  //     observer.next(null);
  //     observer.complete();
  //   });
  //   this.UserAccount = new Observable(observer => {
  //     observer.next(null);
  //     observer.complete();
  //   })
  // }

  public updateUserProfile(id: string, data: UserProfile) {
    return this.userCollection.doc(id).update({ ...data })
      .then(success => {
      this.toastr.success('Profile Updated!')
    })
      .catch(error => this.errorHandler(error, 'Could not update! Try again.'))
  }

  private errorHandler(error, msg?: string) {
    return this.toastr.error(`Uh oh! ${error.message ? error.message : msg ? msg:'Error, try again.'}.`)
  }
}
