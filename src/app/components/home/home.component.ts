import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { Inject } from '@angular/core';
import { User } from 'src/app/model/user';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  public password!: string;
  public email!: string;
  public registerName!: string;
  public registerEmail!: string;
  public registerPassword!: string;

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
  register() {
    let user: User = {
      name: this.registerName,
      email: this.registerEmail,
      password: this.registerPassword,
      isAdmin: false
    }
    this.globalService.doRegister(user);
  }
  ngOnInit(): void {

  }

}
