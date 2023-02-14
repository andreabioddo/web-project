import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Seat } from 'src/app/model/seat.model';
import { MovieService } from 'src/app/movie.service';

@Component({
    selector: 'app-ticket',
    templateUrl: './ticket.component.html',
    styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
    public seats: Seat[][] = [];
    private showId: string;
    private seatId: string;
    public disableReserveButton: boolean = false;
    public showOtherOptionsSection: boolean = false;
    public reservationSuccessful: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private movieService: MovieService
    ) {
        this.showId = this.route.snapshot.params['showId'];
        this.seatId = this.route.snapshot.params['seatId'];
        this.movieService.getSeats(this.showId).subscribe(
            seats => {
                console.log(seats);
                let seats1D: Seat[] = [];
                for (let seat of seats.avaiable_seats) {
                    let newSeat: Seat = {
                        id: seat.id,
                        seatNumber: seat.number,
                        theaterId: seat.id_theater,
                        removable: seat.removable,
                        row: seat.row,
                        type: seat.type,
                        occupied: false
                    }
                    seats1D.push(newSeat);
                }
                for (let seat of seats.occupied_seats) {
                    let newSeat: Seat = {
                        id: seat.id,
                        seatNumber: seat.number,
                        theaterId: seat.id_theater,
                        removable: seat.removable,
                        row: seat.row,
                        type: seat.type,
                        occupied: true
                    }
                    seats1D.push(newSeat);
                }
                let reduceTo2D = seats1D.reduce(function (a: any, c: any) {
                    a[c.row] = a[c.row] || [];
                    a[c.row].push(c);
                    return a;
                }, {});
                this.seats = Object.keys(reduceTo2D).map((k) => reduceTo2D[k]);

                for (let i = 0; i < this.seats.length; i++) {
                    this.seats[i] = this.seats[i].sort((a: Seat, b: Seat) => a.seatNumber - b.seatNumber);
                }
            }
        );
    }
    reserveSeat() {
        this.disableReserveButton = true;
        this.movieService.reserveSeat(this.seatId, this.showId).subscribe(
            success => {
                this.showOtherOptionsSection = true;
                this.reservationSuccessful = true;
            },
            error => {
                console.log(error)

                this.showOtherOptionsSection = true;
                this.reservationSuccessful = false;
            }
        )
}

isSelectedSeat(seat: Seat) {
    if (seat.id.toString() === this.seatId)
        return true;
    return false;
}
ngOnInit(): void {
}

}
