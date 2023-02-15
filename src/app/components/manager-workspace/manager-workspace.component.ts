import { Component, OnInit } from '@angular/core';
import { Theater } from 'src/app/model/theater.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-manager-workspace',
  templateUrl: './manager-workspace.component.html',
  styleUrls: ['./manager-workspace.component.scss']
})
export class ManagerWorkspaceComponent implements OnInit {
navBarclicked=false;
  constructor(private router:Router) { 
    this.navBarclicked=false;
  }

  ngOnInit(): void {
  }
navigate(path:string){
  this.navBarclicked=true;
  this.router.navigate(['/manager',path])
}
backHome(){
  this.navBarclicked=false;
  this.router.navigate(['/manager']);
}
}
