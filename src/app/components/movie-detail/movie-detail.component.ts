import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/model/movie.model';
import { Seat } from 'src/app/model/seat.model';
import { Show } from 'src/app/model/show.model';
import { MovieService } from 'src/app/movie.service';
import { Rating } from 'src/app/model/rating.model';
import { RatingService } from 'src/app/rating.service';

@Component({
    selector: 'app-movie-detail',
    templateUrl: './movie-detail.component.html',
    styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
    public id: string;
    public movie!: Movie;
    public shows: Show[] = [];
    public seats: Seat[][] = [];
    public selectedShow!: Show;
    public math: any;
    public ratings: Rating[] = [];
    public ratingInput!: string;
    public starsInput!: number;

    constructor(
        private route: ActivatedRoute,
        private movieService: MovieService,
        private ratingService: RatingService
    ) {
        this.math = Math;
        this.id = this.route.snapshot.params['id'];
        this.movieService.getMovie(this.id).subscribe(
            (movie: Movie) => {
                this.movie = movie;
            }
        );
        this.movieService.getShows(this.id).subscribe(
            shows => {
                for (let show of shows) {
                    let newShow: Show = {
                        time: show.date.split("T")[0] + ' ' + show.time,
                        theaterName: show.theatername,
                        theaterId: show.theaterid,
                        showId: show.showid
                    }
                    this.shows.push(newShow);
                }
            }
        );
        this.ratingService.getRatings(this.id).subscribe(
            ratings => {
                this.ratings = ratings;
            }
        )
    }
    onChange() {
        this.movieService.getSeats(this.selectedShow.showId.toString()).subscribe(
            seats => {
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

    addRating() {
        let rating: Rating = {
            review: this.ratingInput,
            userId: 0,
            movieId: this.id,
            stars: this.starsInput,
            name: ""
        };

        this.ratingService.addRating(rating).subscribe(c => {
            this.ratings.push(rating);
        }
        );
    }

    ngOnInit(): void {
    }

}
