import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { AppSettings } from './app-settings';
import { GlobalService } from './global.service';
import { Movie } from './model/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieEService {
  
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
  getSeats(showId: string) {
    return this.http.get<any>(AppSettings.API_ENDPOINT + '/movie/detailseats/' + showId)
  }
  reserveSeat(seatId: string) {
    let rand: boolean = Math.random() < 0.5;
    return of(rand);
    // return this.http.post<any>(AppSettings.API_ENDPOINT + RESERVE_ENDPOINT + seatId)
  }
  addMovie(movie:any){
    return this.http.post<any>(AppSettings.API_ENDPOINT + '/movie/add', movie);
  }
  deleteMovie(id:number){
    return this.http.delete<any>(AppSettings.API_ENDPOINT + `/movie/${id}`);
  }
  getParticularMovie(id:number){
    return this.http.get<any>(AppSettings.API_ENDPOINT + `/movie/${id}`);
  }
  editMovie(movie:any,id:number){
    return this.http.put<any>(AppSettings.API_ENDPOINT + `/movie/${id}`,movie);
  }
}
