import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "./model/user"
import { AppSettings } from "./app-settings";
@Injectable()
export class GlobalService {

    private token: string = '';
    public loggedIn = false;
    constructor(private http: HttpClient) { }

    doLogin(email: string, password: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            // maybe needed for future: 'Authorization': 'Basic YW5ndWxhcjphbmd1bGFy'
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
                this.token = token.login;
                this.loggedIn = true;
            },
            error => console.error('Error during login: ', error));
    }
    doRegister(user: User) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            // maybe needed for future: 'Authorization': 'Basic YW5ndWxhcjphbmd1bGFy'
        });

        const options = {
            headers
        };

        console.log(user);
        return this.http.post<any>(AppSettings.API_ENDPOINT + '/user/register', user, options).subscribe(
            token => {
                this.token = token.login;
                this.loggedIn = true;
            },
            error => console.error('Error during login: ', error));
    }

}