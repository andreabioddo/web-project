import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from './app-settings';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private createHeader() {
    const headers = new HttpHeaders({
      'Authorization': this.cookieService.get("AuthToken")
    });
    const options = {
      headers
    };

    return options;
  }
  constructor(private http: HttpClient, private cookieService: CookieService) {

  }
  getUsers() {
    let options = this.createHeader();
    return this.http.get<any>(AppSettings.API_ENDPOINT + `/user/`, options);
  }
}