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
export class SeatsEService {

  constructor(private http: HttpClient,private globalService: GlobalService) {
    
   }
 

  addSeat(seat:any,theaterId:number){
    return this.http.post<any>(AppSettings.API_ENDPOINT + `/theater/${theaterId}/addseat`,seat  );
  }
  removeSeat(theaterId:number,seatId:number){
    return this.http.delete<any>(AppSettings.API_ENDPOINT + `/theater/${theaterId}/removeseat/${seatId}`);
  }
  editSeat(seat:any,theaterId:number,seatId:number){
    return this.http.put<any>(AppSettings.API_ENDPOINT + `/theater/${theaterId}/updateseat/${seatId}`,seat);
  }
}
