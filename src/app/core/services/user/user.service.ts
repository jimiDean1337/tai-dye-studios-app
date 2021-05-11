import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  state = {
    userAccount: JSON.parse(localStorage['userAccount'] || '{}')
  }
  constructor() { }
}
