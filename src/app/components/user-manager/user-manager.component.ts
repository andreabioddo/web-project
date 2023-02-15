import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/model/ticket.model';
import { TicketService } from 'src/app/ticket.service';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {
  public tickets!: Ticket[];
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = '';
  closeResult = '';

  constructor(private ticketService: TicketService,
    private modalService: NgbModal) {
    this.ticketService.getTickets()
      .pipe(map(res => res.map((item: any) => ({ id: item.id, price: item.price, time: new Date(new Date((new Date(item.date)).setHours((new Date(item.date)).getHours() + item.time.split(":")[0])).setMinutes((new Date(item.date)).getMinutes() + item.time.split(":")[1])), theater: item.theatername, seat: item.seatnumber, movieName: item.moviename }))))
      .subscribe(
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
      window.location.reload();
    },
    err => {
      window.alert("Ticket return unsuccessfull! Try again later.");
    }
    )
  }

  openQR(content: any, i: number) {
    this.value = this.tickets[i].movieName + this.tickets[i].id;
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
