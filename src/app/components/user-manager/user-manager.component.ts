import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/model/ticket.model';
import { TicketService } from 'src/app/ticket.service';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {
  public tickets!: Ticket[];

  constructor(private ticketService: TicketService) {
    this.ticketService.getTickets().subscribe(
      (results: Ticket[]) => {
          this.tickets = results;
      });
  }

  isNonreturnable(item: Ticket) {
    let now = new Date();
    let hourLater = new Date(now.setMinutes(now.getDate() + 60));
    if (item.time > hourLater)
      return false;
    return true;
  }

  returnTicket(event: any, i: number) {
    event.target.disabled = true;
    this.ticketService.returnTicket(this.tickets[i]).subscribe(result => {
      if(!result)
        window.alert("Ticket return unsuccessfull! Try again later.");
      window.location.reload();
    })
  }

  requestQR(event: any, i: number) {
    // TODO
  }
  ngOnInit(): void {
  }

}
