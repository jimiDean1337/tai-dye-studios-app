import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, private userService: UserService) { }


  public getUserAccount(userId) {
    return this.userService.getUserById(userId);
  }
  public getUserOrders(userId: string) {
    return this.userService.getUserCollectionByName(userId, 'orders').valueChanges()
  }

  public getUserWishlist(userId: string) {
    return this.userService.getUserCollectionByName(userId, 'wishlist')
  }

  public getUserAddresses(userId: string) {
    return this.userService.getUserCollectionByName(userId, 'addresses')
  }

  public getUserCoupons(userId: string) {
    return this.userService.getUserCollectionByName(userId, 'coupons')
  }

  public getUserNewsletters(userId: string) {
    return this.userService.getUserCollectionByName(userId, 'newsletters')
  }

  public addToUserCollection(userId: string, collectionName: string, data: any) {
    return this.userService.getUserCollectionByName(userId, collectionName).add(data);
  }
}
