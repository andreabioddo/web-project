import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Theater } from 'src/app/model/theater.model';
@Component({
  selector: 'app-theaters-control',
  templateUrl: './theaters-control.component.html',
  styleUrls: ['./theaters-control.component.scss']
})
export class TheatersControlComponent implements OnInit {
  @ViewChild('dialog') dialog!: ElementRef<any>;
  @ViewChild('createTheaterform') createTheaterForm!: ElementRef<any>;
  theatersList!: Theater[];
  listOfFeatures: string[];
  newTheaterID!: number;
  newTheaterName!: string;
  numberOfSeats!: number;
  modalType='create';
  currentTheater!:Theater;
  constructor() {
    this.listOfFeatures = [];
    this.theatersList = [];
  }

  ngOnInit(): void {
  }
  set3D() {
    this.listOfFeatures.push('3D');
  }
  set4D() {
    this.listOfFeatures.push('4D');
  }
  setDolby() {
    this.listOfFeatures.push('Dolby Atmos');
  }
  openAddCinemaDialog(type:string,theater:Theater={id:1,name:'d',numberOfSeats:4,listOfFeatures:[]}) {
      this.dialog.nativeElement.show();
      this.modalType=type;
      this.currentTheater=theater;
  }
  closeDialog() {
  this.dialog.nativeElement.close();
  this.listOfFeatures = [];
  }
  isFeatureAvaliable(listOfFeatures: string[], feature: string) {
    if (listOfFeatures.find(elem => elem == feature)) {
      return 'Avaliable';
    }
    return 'Unavaliale';
  }
  createTheater(e: any) {
    const newTheater = { id: this.newTheaterID, name: this.newTheaterName, numberOfSeats: this.numberOfSeats, listOfFeatures: this.listOfFeatures };
    this.createTheaterForm.nativeElement.reset();
    this.listOfFeatures = [];
    this.dialog.nativeElement.close();
    if(this.modalType=='create'){
      this.theatersList.push(newTheater);
    }else{
      this.theatersList[this.theatersList.findIndex(elem=>elem.id==this.currentTheater.id)]=newTheater;
    }
    
  }
  deleteTheater(theater:Theater){
this.theatersList.splice(this.theatersList.findIndex(elem=>elem.id==theater.id), 1);
  }
}
