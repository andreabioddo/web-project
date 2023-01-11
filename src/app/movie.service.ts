import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Movie } from './model/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  
  constructor(private http: HttpClient, private globalService: GlobalService) { }
  getMovies() {
    return this.http.get<Movie[]>(this.globalService.baseURL + '/movie');
  }
}
