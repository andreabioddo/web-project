import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { AppSettings } from './app-settings';
import { GlobalService } from './global.service';
import { Theater } from './model/theater.model';

@Injectable({
  providedIn: 'root'
})
export class TicketsEService {

  constructor(private http: HttpClient,private globalService: GlobalService) {
    
   }
   getTickets(){
    return this.http.get<any>(AppSettings.API_ENDPOINT + `/ticket/`);
   }

   //DONE
   addTicket(ticket:any){
    return this.http.post<any>(AppSettings.API_ENDPOINT + `/ticket/add`,ticket);
   }

   //DONE
   deleteTicket(id:number){
    return this.http.delete<any>(AppSettings.API_ENDPOINT + `/ticket/${id}`);
   }
}