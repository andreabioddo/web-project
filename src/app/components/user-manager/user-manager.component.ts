import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/model/ticket.model';
import { TicketService } from 'src/app/ticket.service';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {
  public tickets!: Ticket[];
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = 'https://www.techiediaries.com/';
  closeResult = '';

  constructor(private ticketService: TicketService,
    private modalService: NgbModal) {
    this.ticketService.getTickets().subscribe(
      (results: Ticket[]) => {
        console.log(results);
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
      if (!result)
        window.alert("Ticket return unsuccessfull! Try again later.");
      window.location.reload();
    })
  }

  openQR(content: any, i: number) {
    // TODO: here add a the code to the value
    this.value = this.tickets[i].movieName;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }

  }
  ngOnInit(): void {
  }

}
