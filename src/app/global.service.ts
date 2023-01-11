import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {map} from "rxjs/operators";
import { User } from "./model/user";

@Injectable()
export class GlobalService{
    private baseURL = "http://localhost:3000";
    constructor(private http: HttpClient){
    }

    //List of service that use REST API to get the values and each function will return an observable
    doLogin(name:string, password:string):Observable<User>{
        return this.http.post<User>(this.baseURL + "/login", {name:name, password:password});        
    }
}