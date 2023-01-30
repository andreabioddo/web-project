import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { Ticket } from './model/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor() { }
  getTickets() {
    let today = new Date();
    let tickets: Ticket[] = [
      {
        price: 10,
        time: new Date(today.setMinutes(today.getDate() + 30)),
        theater: "Theater 1",
        seat: 20,
        movieName: "Madagascar"
      },
      {
        price: 10,
        time: new Date(today.setDate(today.getDate() + 2)),
        theater: "Theater 2",
        seat: 22,
        movieName: "Shrek"
      }
    ]
    return of(tickets);

    // return this.http.get<any>(AppSettings.API_ENDPOINT + '/movie/detailseats/' + showId)
  }
  returnTicket(ticket: Ticket) {
    let rand: boolean = Math.random() < 0.5;
    return of(rand);
  }
}
