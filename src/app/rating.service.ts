import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { AppSettings } from './app-settings';
import { Rating } from './model/rating.model';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }
  getRatings(movieId: string) {
    let ratings : Rating[] = [
      {
        stars: 3,
        review: "Pretty good",
        userId: 1,
        movieId: movieId
      },
      {
        stars: 4,
        review: "Awesome!",
        userId: 1,
        movieId: movieId
      }
    ]
    return of(ratings);

    // TODO: When the backend will be implemented, do something like this:
    // return this.http.get<Rating>(AppSettings.API_ENDPOINT + REVIEW_ENDPOINT);
  }
  addRating(rating: Rating) {
    return of(true);

    // TODO: When the backend will be implemented, do something like this:
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   // maybe needed for future: 'Authorization': 'Basic YW5ndWxhcjphbmd1bGFy'
    // });
    // const options = {
    //   headers
    // };
    // return this.http.post<Rating>(AppSettings.API_ENDPOINT + REVIEW_ENDPOINT, post, options);

  }
}
