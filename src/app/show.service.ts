import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from './app-settings';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class ShowsService {
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
    getShows() {
        let options = this.createHeader();
        return this.http.get<any>(AppSettings.API_ENDPOINT + `/show`, options);
    }
    addShow(show: any) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.cookieService.get("AuthToken")
        });
        const options = {
            headers
        };
        return this.http.post<any>(AppSettings.API_ENDPOINT + `/show/add`, show, options);
    }
    deleteShow(id: number) {
        let options = this.createHeader();
        return this.http.delete<any>(AppSettings.API_ENDPOINT + `/show/${id}`, options);
    }
    updateShow(show: any, id: number) {
        let options = this.createHeader();
        return this.http.put<any>(AppSettings.API_ENDPOINT + `/show/${id}`, show, options);
    }
}