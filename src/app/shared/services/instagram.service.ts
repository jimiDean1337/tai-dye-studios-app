import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {

  // Initialize
  constructor(private http: HttpClient) { }

  // Instagram Array
  public get getInstagramData() {
    return this.http.get(`https://graph.instagram.com/17841448602975001/media?fields=id,link,media_url,permalink,caption&access_token=${environment.instagram_token}`);
  }

}
