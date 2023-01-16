import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from './app-settings';
import { GlobalService } from './global.service';
import { Movie } from './model/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  
  constructor(private http: HttpClient, private globalService: GlobalService) { }
  getMovies() {
    return this.http.get<Movie[]>(AppSettings.API_ENDPOINT + '/movie');
  }
  getMovie(movieId: string) {
    return this.http.get<Movie>(AppSettings.API_ENDPOINT + '/movie/' + movieId);
  }
  getShows(movieId: string) {
    return this.http.get<any>(AppSettings.API_ENDPOINT + '/movie/show/' + movieId)
  }
  getSeats(theaterId: number) {
    return this.http.get<any>(AppSettings.API_ENDPOINT + '/theater/seats/' + theaterId)
  }
}
