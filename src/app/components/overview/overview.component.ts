import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/model/movie.model';
import { MovieService } from '../../movie.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  public results!: Movie[];
  constructor(private movieService: MovieService) {
    this.movieService.getMovies().subscribe(
      (results: Movie[]) => {
          this.results = results;
      });
   }

  ngOnInit(): void {
  }

}
