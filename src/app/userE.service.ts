import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { AppSettings } from './app-settings';
import { GlobalService } from './global.service';
import { Theater } from './model/theater.model';

@Injectable({
  providedIn: 'root'
})
export class UsersEEService {

  constructor(private http: HttpClient,private globalService: GlobalService) {
    
   }
   getUsers(){
    return this.http.get<any>(AppSettings.API_ENDPOINT + `/user/`);
   }
}