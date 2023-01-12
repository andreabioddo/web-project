import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/model/movie.model';
import { Show } from 'src/app/model/show.model';
import { MovieService } from 'src/app/movie.service';

@Component({
    selector: 'app-movie-detail',
    templateUrl: './movie-detail.component.html',
    styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
    private id: string;
    public movie!: Movie;
    public shows!: Show[];
    constructor(
        private route: ActivatedRoute,
        private movieService: MovieService
    ) {
        this.id = this.route.snapshot.params['id'];
        this.movieService.getMovie(this.id).subscribe(
            (movie: Movie) => {
                this.movie = movie;
            }
        );
        this.movieService.getShows(this.id).subscribe(
            shows => {
                console.log(shows);
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

    }

    ngOnInit(): void {
    }

}
