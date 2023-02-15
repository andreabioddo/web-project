import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { AppSettings } from './app-settings';
import { GlobalService } from './global.service';
import { Theater } from './model/theater.model';

@Injectable({
  providedIn: 'root'
})
export class TheatersEService {

  constructor(private http: HttpClient,private globalService: GlobalService) {
    
   }
  getTheaters(){
return this.http.get<any>(AppSettings.API_ENDPOINT + '/theater/' );
  }
  addTheater(theater:any){
    return this.http.post<any>(AppSettings.API_ENDPOINT + '/theater/add',theater  );
  }

  updateTheater(theater:any,id:number){
    return this.http.put<any>(AppSettings.API_ENDPOINT + `/theater/${id}`,theater  );
  }
  getTheatersFeaturesList(){
    return this.http.get<any>(AppSettings.API_ENDPOINT + '/theater/allfeatures' );
    
  }
  deleteTheater(id:number){
    console.log(id);
    return this.http.delete<any>(AppSettings.API_ENDPOINT + `/theater/${id}` );
  }
  getTheater(id:number){
    return this.http.get<any>(AppSettings.API_ENDPOINT + `/theater/${id}` );
  }
}
