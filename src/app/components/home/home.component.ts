import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
    registration=false;
    constructor(private globalService:GlobalService) { }

    registrationOpen(e:any){
        e.preventDefault();
        this.registration=true;
    }

    logIn(e:any){
        e.preventDefault();
        // console.log(this.globalService.doLogin("Name", "pass"));
    

    }
    ngOnInit(): void {

    }

}
