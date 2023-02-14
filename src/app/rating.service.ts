import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { AppSettings } from './app-settings';
import { CookieService } from 'ngx-cookie-service';
import { Rating } from './model/rating.model';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }
  getRatings(movieId: string) {
    return this.http.get<Rating[]>(AppSettings.API_ENDPOINT + "/review/" + movieId);
  }
  addRating(rating: Rating) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.cookieService.get("AuthToken")
    });
    const options = {
      headers
    };
    let ratingNettworkWrapper = {
      stars: rating.stars,
      review: rating.review
    }
    return this.http.post<Rating>(AppSettings.API_ENDPOINT + "/review/" + rating.movieId + "/add", ratingNettworkWrapper, options);

  }
}
