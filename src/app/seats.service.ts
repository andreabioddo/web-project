import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from './app-settings';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class SeatsService {
    private createHeader() {
        const headers = new HttpHeaders({
            'Authorization': this.cookieService.get("AuthToken")
        });
        const options = {
            headers
        };

        return options;
    }
    constructor(private http: HttpClient, private cookieService: CookieService) {

    }


    addSeat(seat: any, theaterId: number) {
        let options = this.createHeader();
        return this.http.post<any>(AppSettings.API_ENDPOINT + `/theater/${theaterId}/addseat`, seat, options);
    }
    removeSeat(theaterId: number, seatId: number) {
        let options = this.createHeader();
        return this.http.delete<any>(AppSettings.API_ENDPOINT + `/theater/${theaterId}/removeseat/${seatId}`, options);
    }
    editSeat(seat: any, theaterId: number, seatId: number) {
        let options = this.createHeader();
        return this.http.put<any>(AppSettings.API_ENDPOINT + `/theater/${theaterId}/updateseat/${seatId}`, seat, options);
    }
}
