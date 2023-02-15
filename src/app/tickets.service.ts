import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppSettings } from './app-settings';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
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
  getTickets() {
    let options = this.createHeader();
    return this.http.get<any>(AppSettings.API_ENDPOINT + `/ticket/`, options);
  }

  addTicket(ticket: any) {
    let options = this.createHeader();
    return this.http.post<any>(AppSettings.API_ENDPOINT + `/ticket/add`, ticket, options);
  }

  deleteTicket(id: number) {
    let options = this.createHeader();
    return this.http.delete<any>(AppSettings.API_ENDPOINT + `/ticket/${id}`, options);
  }
}