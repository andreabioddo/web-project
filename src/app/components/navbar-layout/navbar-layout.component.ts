import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-navbar-layout',
  templateUrl: './navbar-layout.component.html',
  styleUrls: ['./navbar-layout.component.scss']
})
export class NavbarLayoutComponent implements OnInit {

  constructor(private globalService: GlobalService) { }
  logout() {
    this.globalService.logout();
  }
  ngOnInit(): void {
  }

}
