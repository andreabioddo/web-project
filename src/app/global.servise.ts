import { Injectable } from "@angular/core";


import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {map} from "rxjs/operators";
import { User } from "./user";
@Injectable()
export class GlobalService{


    private baseURL = "http://localhost:3000";
    

    //List of service that use REST API to get the values and each function will return an observable
    // doLogin():Observable<User>{
    //     // return this.http.get<User>(this.baseURL + "/login");  
    //     alert('me');      
    // }
    doLogin(){
        // return this.http.get<User>(this.baseURL + "/login");  
        alert('me');      
    }

}