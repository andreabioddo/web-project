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
 //constructor(private http: HttpClient){
     
    doLogin(email:string, password:string):Observable<any>{
        return this.http.post<any>(this.baseURL + "/login", {email:email, password:password});        
    }
}