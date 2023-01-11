import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "./model/user"
@Injectable()
export class GlobalService {

    private token: string = '';
    public loggedIn = false;
    public baseURL = "http://localhost:3000";
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
        console.log(user);
        return this.http.post<any>(this.baseURL + '/login', user, options).subscribe(
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
        return this.http.post<any>(this.baseURL + '/user/register', user, options).subscribe(
            token => {
                this.token = token.login;
                this.loggedIn = true;
            },
            error => console.error('Error during login: ', error));
    }

}