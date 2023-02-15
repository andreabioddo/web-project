import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { AppSettings } from './app-settings';
import { GlobalService } from './global.service';
import { Theater } from './model/theater.model';
import { Seat } from './model/seat.model';
@Injectable({
    providedIn: 'root'
  })
  export class ReviewsEService {
    constructor(private http: HttpClient,private globalService: GlobalService) {
    
    }
    getReview(id:number){
        return this.http.get<any>(AppSettings.API_ENDPOINT + `/review/${id}`);
    }
    deleteReview(id:number){
        return this.http.delete<any>(AppSettings.API_ENDPOINT + `/review/${id}`);
    }
  }