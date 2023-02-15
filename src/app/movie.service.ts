import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { AppSettings } from './app-settings';
import { CookieService } from 'ngx-cookie-service';
import { Movie } from './model/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private createHeader() {
    const headers = new HttpHeaders({
      'Authorization': this.cookieService.get("AuthToken")
    });
    const options = {
      headers
    };

    return options;
  }
  constructor(private http: HttpClient, private cookieService: CookieService) { }
  getMovies() {
    let options = this.createHeader();
    return this.http.get<Movie[]>(AppSettings.API_ENDPOINT + '/movie', options);
  }
  getMovie(movieId: string) {
    let options = this.createHeader();
    return this.http.get<Movie>(AppSettings.API_ENDPOINT + '/movie/' + movieId, options);
  }
  getShows(movieId: string) {
    let options = this.createHeader();
    return this.http.get<any>(AppSettings.API_ENDPOINT + '/movie/show/' + movieId, options)
  }
  getSeats(showId: string) {
    let options = this.createHeader();
    return this.http.get<any>(AppSettings.API_ENDPOINT + '/movie/detailseats/' + showId, options)
  }
  reserveSeat(seatId: string, showId: string) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.cookieService.get("AuthToken")
    });

    const options = {
      headers
    };

    let networkWrapper = {
      price: Math.random(),
      id_seat: seatId,
      id_show: showId
    }

    return this.http.post<any>(AppSettings.API_ENDPOINT + "/ticket/add", networkWrapper, options);
  }
  addMovie(movie: any) {
    let options = this.createHeader();
    return this.http.post<any>(AppSettings.API_ENDPOINT + '/movie/add', movie, options);
  }
  deleteMovie(id: number) {
    let options = this.createHeader();
    return this.http.delete<any>(AppSettings.API_ENDPOINT + `/movie/${id}`, options);
  }
  getParticularMovie(id: number) {
    let options = this.createHeader();
    return this.http.get<any>(AppSettings.API_ENDPOINT + `/movie/${id}`, options);
  }
  editMovie(movie: any, id: number) {
    let options = this.createHeader();
    return this.http.put<any>(AppSettings.API_ENDPOINT + `/movie/${id}`, movie, options);
  }
}
