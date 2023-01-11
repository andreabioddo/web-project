import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  public password!: string;
  public email!: string;
  registration = false;
  constructor(private globalService: GlobalService) { }
  registrationOpen(e: any) {
    e.preventDefault();
    this.registration = true;
  }
  logIn(e: any) {
    e.preventDefault();
    this.globalService.doLogin(this.email, this.password);

  }
  ngOnInit(): void {

  }

}
