import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable()
export class GlobalService {

    private token! : string;
    private baseURL = "http://localhost:3000";
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
        return this.http.post<string>(this.baseURL + '/login', user, options).subscribe((token: string) => {
            this.token = token;
            console.log(token);
        },
        error => console.log('oops', error));
    }

}