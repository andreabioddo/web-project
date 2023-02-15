import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppSettings } from './app-settings';

@Injectable({
  providedIn: 'root'
})
export class TheatersService {
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
  getTheaters() {
    let options = this.createHeader();

    return this.http.get<any>(AppSettings.API_ENDPOINT + '/theater/', options);
  }
  addTheater(theater: any) {
    let options = this.createHeader();
    return this.http.post<any>(AppSettings.API_ENDPOINT + '/theater/add', theater, options);
  }

  updateTheater(theater: any, id: number) {
    let options = this.createHeader();
    return this.http.put<any>(AppSettings.API_ENDPOINT + `/theater/${id}`, theater, options);
  }
  getTheatersFeaturesList() {
    let options = this.createHeader();
    return this.http.get<any>(AppSettings.API_ENDPOINT + '/theater/allfeatures', options);

  }
  deleteTheater(id: number) {
    let options = this.createHeader();
    return this.http.delete<any>(AppSettings.API_ENDPOINT + `/theater/${id}`, options);
  }
  getTheater(id: number) {
    let options = this.createHeader();
    return this.http.get<any>(AppSettings.API_ENDPOINT + `/theater/${id}`, options);
  }
}
