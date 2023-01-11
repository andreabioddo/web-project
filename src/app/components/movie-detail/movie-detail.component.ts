import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  private id: string;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
  }

}
