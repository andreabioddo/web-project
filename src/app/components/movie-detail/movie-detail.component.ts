import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/model/movie.model';
import { MovieService } from 'src/app/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  private id: string;
  public movie!: Movie;
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) 
  {
    this.id = this.route.snapshot.params['id'];
    this.movieService.getMovie(this.id).subscribe(
      (movie: Movie) => {
        this.movie = movie;
      });
  }

  ngOnInit(): void {
  }

}
