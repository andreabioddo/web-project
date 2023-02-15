import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "./model/user"
import { AppSettings } from "./app-settings";
import { CookieService } from 'ngx-cookie-service';
import { Route, Router } from "@angular/router";

@Injectable()
export class GlobalService {

    private token: string = '';
    public loggedIn = false;
    constructor(private http: HttpClient, private cookieService: CookieService) { }

    doLogin(email: string, password: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        const options = {
            headers
        };

        let user = {
            email: email,
            password: password
        }
        return this.http.post<any>(AppSettings.API_ENDPOINT + '/login', user, options).subscribe(
            token => {
                if(token.isAdmin){
                    this.cookieService.set('Admin', 'true', { expires: new Date(new Date().getTime() +  1000 * 60 * 60) });
                }
                this.cookieService.set('AuthToken', token.login, { expires: new Date(new Date().getTime() +  1000 * 60 * 60) });
                this.token = token.login;
                this.loggedIn = true;
            },
            error => console.error('Error during login: ', error));
    }
    doRegister(user: User) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        const options = {
            headers
        };

        return this.http.post<any>(AppSettings.API_ENDPOINT + '/user/register', user, options).subscribe(
            token => {
                this.cookieService.set('AuthToken', token.login, { expires: new Date(new Date().getTime() +  1000 * 60 * 60) });
                this.token = token.login;
                this.loggedIn = true;
            },
            error => console.error('Error during login: ', error));
    }

}