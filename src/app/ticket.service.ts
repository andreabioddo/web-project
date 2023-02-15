import { Injectable } from '@angular/core';
import { Ticket } from './model/ticket.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppSettings } from './app-settings';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private createHeader() {
    const headers = new HttpHeaders({
      'Authorization': this.cookieService.get("AuthToken")
    });
    const options = {
      headers
    };

    return options;
  }
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

  getTicketsAdmin() {
    const headers = new HttpHeaders({
      'Authorization': this.cookieService.get("AuthToken")
    });
    const options = {
      headers
    };

    return this.http.get<any>(AppSettings.API_ENDPOINT + '/ticket/', options);
  }

  returnTicket(ticket: Ticket) {
    let options = this.createHeader();
    return this.http.delete<any>(AppSettings.API_ENDPOINT + '/ticket/' + ticket.id, options);
  }
  addTicket(ticket: any) {
    let options = this.createHeader();
    return this.http.post<any>(AppSettings.API_ENDPOINT + `/ticket/addadmin`, ticket, options);
  }

  deleteTicket(id: number) {
    let options = this.createHeader();
    return this.http.delete<any>(AppSettings.API_ENDPOINT + `/ticket/${id}`, options);
  }

}
