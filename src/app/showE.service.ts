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
export class ShowsEService {

  constructor(private http: HttpClient,private globalService: GlobalService) {
    
   }
getShows(){
    return this.http.get<any>(AppSettings.API_ENDPOINT + `/show`);
   }
   addShow(show:any){
    return this.http.post<any>(AppSettings.API_ENDPOINT + `/show/add`, show);
   }
   deleteShow(id:number){
    return this.http.delete<any>(AppSettings.API_ENDPOINT + `/show/${id}`);
   }
   updateShow(show:any,id:number){
    return this.http.put<any>(AppSettings.API_ENDPOINT + `/show/${id}`,show);
   }
}