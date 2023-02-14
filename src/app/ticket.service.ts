import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { Ticket } from './model/ticket.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppSettings } from './app-settings';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }
  getTickets() {    
    const headers = new HttpHeaders({
      'Authorization': this.cookieService.get("AuthToken")
    });
    const options = {
      headers
    };

    return this.http.get<any>(AppSettings.API_ENDPOINT + '/ticket/ofuser/', options);
  }
  returnTicket(ticket: Ticket) {
    const headers = new HttpHeaders({
      'Authorization': this.cookieService.get("AuthToken")
    });
    const options = {
      headers
    };

    return this.http.delete<any>(AppSettings.API_ENDPOINT + '/ticket/' + ticket.id, options);
  }
}
