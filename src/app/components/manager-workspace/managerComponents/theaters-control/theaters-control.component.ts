import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Feature } from 'src/app/model/feature.model';
import { Theater } from 'src/app/model/theater.model';
//import { TheaterService } from 'src/app/theater.service';
//import { Seat } from 'src/app/model/seat.model';
//import { SeatsService } from 'src/app/seats.service';
import { TheatersService } from 'src/app/theaters.service';
import { SeatsService } from 'src/app/seats.service';
@Component({
  selector: 'app-theaters-control',
  templateUrl: './theaters-control.component.html',
  styleUrls: ['./theaters-control.component.scss']
})
export class TheatersControlComponent implements OnInit {
  @ViewChild('dialog') dialog!: ElementRef<any>;
  @ViewChild('seatsDialog') seatsDialog!: ElementRef<any>;
  @ViewChild('addSeatDialog') addSeatDialog!: ElementRef<any>
  @ViewChild('createTheaterform') createTheaterForm!: ElementRef<any>;
  seatAddType='add';
  currentSeatToUpdate!:any;
  theatersList!: any;
  newTheaterName!: string;
  numberOfSeats!: number;
  modalType = 'create';
  currentTheater!: Theater;
  listOfFeaturesToAdd!: number[];
  features!: Feature[];
  currentFeatureToAdd!: number;
  rows!: any;
  currentTheaterSeatsConfiguration!: any;
  seatToAddtype!: string;
  seatToAddRemovable = false;
  currentCinemaToUpdate!: any;

  constructor(private theaterService: TheatersService, private seatsService: SeatsService) {
    this.listOfFeaturesToAdd = [];
    this.theatersList = [];
    this.theaterService.getTheatersFeaturesList().subscribe((features: any) => {
      this.features = features;
    });
    this.updateTheatersWrapper();


  }

  ngOnInit(): void {
  }

  addFeature() {
    if(!this.currentFeatureToAdd){
      return;
    }
    if (!this.listOfFeaturesToAdd.find(elem => elem == this.currentFeatureToAdd)) {
      this.listOfFeaturesToAdd.push(+this.currentFeatureToAdd);
    }
    
  }
  deleteFeature() {
    this.listOfFeaturesToAdd = this.listOfFeaturesToAdd.filter(elem => elem != +this.currentFeatureToAdd);
  }
  openAddCinemaDialog(type: string) {
    this.dialog.nativeElement.show();
    this.modalType = type;
  }
  openUpdateCinemaDialog(theater: any) {
    this.currentCinemaToUpdate = theater;
    this.modalType = 'update';
    this.newTheaterName = this.currentCinemaToUpdate.name;
    this.numberOfSeats = this.currentCinemaToUpdate.number_of_seats;

    for (let i = 0; i < Object.keys(theater.features).length; i++) {
      this.listOfFeaturesToAdd.push(this.currentCinemaToUpdate.features[i].id);
    }
    this.dialog.nativeElement.show();

  }
  closeDialog() {
    this.refresh();
    this.dialog.nativeElement.close();
  }
  isFeatureAvaliable(listOfFeatures: string[], feature: string) {
    if (listOfFeatures.find(elem => elem == feature)) {
      return 'Avaliable';
    }
    return 'Unavaliale';
  }
  createTheater(e: any) {
    if(!this.newTheaterName||!this.numberOfSeats){
alert(`Invalid data!`);
this.dialog.nativeElement.close();
this.refresh();
this.updateTheatersWrapper();
return;
    }
    if (this.modalType == 'create') {
      let numSeats = this.numberOfSeats;
      this.theaterService.addTheater({ name: this.newTheaterName, number_of_seats: this.numberOfSeats, features: this.listOfFeaturesToAdd }).subscribe((id: any) => {
        let columns = Math.floor(Math.sqrt(numSeats));
        let currentSeatNumber = 1;
        let row = 1;
        for (; ;) {
          if (currentSeatNumber > columns * row) {
            row++;
          }
          this.seatsService.addSeat({ number: currentSeatNumber++, row: row, type: 'Regular', removable: true }, id.lastId).subscribe((data) => {
            this.updateTheatersWrapper();
          });;
          if (currentSeatNumber > numSeats) {
            break;
          }
        }

      });
      this.updateTheatersWrapper();
      setTimeout(() => {
        this.refresh();
      }, 200);
      this.updateTheatersWrapper();
      this.updateTheatersWrapper();
      this.updateTheatersWrapper();
      this.updateTheatersWrapper();
      this.updateTheatersWrapper();
    } else {
      let copyNumberOfSeats=this.numberOfSeats;
      this.theaterService.updateTheater({ name: this.newTheaterName, number_of_seats: this.numberOfSeats, features: this.listOfFeaturesToAdd }, this.currentCinemaToUpdate.id).subscribe(elem => {
       
        const quantityDeletedElements = this.currentCinemaToUpdate.number_of_seats - copyNumberOfSeats;
       
        if (quantityDeletedElements > 0) {
          let deletedElementsIds = [];
          this.currentCinemaToUpdate.seats = this.currentCinemaToUpdate.seats.sort(function (a: any, b: any) { return a.number - b.number });
console.log(`seats`);
console.log(this.currentCinemaToUpdate.seats);
          for (let i = 1; i <= quantityDeletedElements; i++) {
            deletedElementsIds.push(this.currentCinemaToUpdate.seats[Object.keys(this.currentCinemaToUpdate.seats).length - i].id);
          }
          for (let i = 0; i < quantityDeletedElements; i++) {
            this.seatsService.removeSeat(this.currentCinemaToUpdate.id, deletedElementsIds[i]).subscribe((data) => { });
          }
        } else if (quantityDeletedElements != 0) {
          this.updateTheatersWrapper();

          let quantatySeatsToAdd = quantityDeletedElements * -1;
          let idOfCurrentCinema = this.currentCinemaToUpdate.id;
          let numberOfSeatsCurCin = this.currentCinemaToUpdate.number_of_seats;
          let theaterRows = [];
          for (let a = 0; a < Object.keys(this.currentCinemaToUpdate.seats).length; a++) {
            theaterRows.push(this.currentCinemaToUpdate.seats[a].row);
          }
          let seatRow = Math.max(...theaterRows);
          
          let massiveToFixBug=[];
          for(let i=0;i<Object.keys(this.currentCinemaToUpdate.seats).length;i++){
            if(this.currentCinemaToUpdate.seats[i].row==1){
              massiveToFixBug.push(this.currentCinemaToUpdate.seats[i].number);
            }
          }
          let columns = Math.max(...massiveToFixBug);
         
          let residual = (columns * seatRow)-numberOfSeatsCurCin;
          console.log('quentaty to add before residual' + quantatySeatsToAdd);
          console.log('residual' + residual);
          for (let i = 0; i < residual; i++) {
            this.seatsService.addSeat({ number: ++numberOfSeatsCurCin, row: seatRow, type: this.seatToAddtype, removable: this.seatToAddRemovable }, idOfCurrentCinema).subscribe((data) => {
            });;
            quantatySeatsToAdd--
          }
          console.log('quentaty to add after residual' + quantatySeatsToAdd);
          let addedSeats = 0;
          for (; ;) {
            console.log('to add' + quantatySeatsToAdd);
            console.log('add' + addedSeats);
            if (addedSeats == quantatySeatsToAdd || addedSeats == 20) {
              break;
            }
            seatRow++;
            for (let i = 0; i < columns; i++) {
              this.seatsService.addSeat({ number: ++numberOfSeatsCurCin, row: seatRow, type: this.seatToAddtype, removable: this.seatToAddRemovable }, idOfCurrentCinema).subscribe((data) => {
              });;
              addedSeats++;
              console.log('to add' + quantatySeatsToAdd);
              console.log('add' + addedSeats);
              if (addedSeats == quantatySeatsToAdd || addedSeats == 20) {
                break;
              }
            }
          }
          this.updateTheatersWrapper();

        }


      });
      setTimeout(() => {
        this.refresh();
        this.updateTheatersWrapper();
      }, 200);
    }
    this.updateTheatersWrapper();
    this.updateTheatersWrapper();
    this.updateTheatersWrapper();
    this.updateTheatersWrapper();
    this.dialog.nativeElement.close();
  }
  deleteTheater(id: number) {
    this.theaterService.deleteTheater(id).subscribe((result) => {
      this.updateTheatersWrapper();
    });

  }
  refresh() {
    this.newTheaterName = '';
    this.numberOfSeats = 0;
    this.listOfFeaturesToAdd = [];
  }
  async updateTheatersWrapper() {
    await this.updateTheaters();
    await this.updateTheaters();
    await this.updateTheaters();
  }
  async updateTheaters() {
     this.theaterService.getTheaters().subscribe(
      (theaters: any) => {
        this.theatersList = theaters;
        console.log(theaters);
      }
    )
     this.theaterService.getTheaters().subscribe(
      (theaters: any) => {
        this.theatersList = theaters;
        console.log(theaters);
      }
    )
  }
  seatsModalOpen(seatsAmount: number, theater: any) {
    this.currentTheaterSeatsConfiguration = theater;
    let theaterRows = [];
    for (let a = 0; a < Object.keys(this.currentTheaterSeatsConfiguration.seats).length; a++) {
      theaterRows.push(this.currentTheaterSeatsConfiguration.seats[a].row);
    }
    let rowsAmount = Math.max(...theaterRows);
    let columnsAmount = Math.floor(theater.number_of_seats / rowsAmount) + 1;
    if (theater.number_of_seats / rowsAmount == (Math.floor(theater.number_of_seats / rowsAmount))) {
      columnsAmount--;
    }
    const rows: any = [];
    let j = 0;
    for (let i = 0; i < rowsAmount; i++) {
      if (j >= seatsAmount) {
        break;
      }
      rows.push([]);
      for (let a = 0; a < columnsAmount; a++) {
        if (j >= seatsAmount) {
          break;
        }
        rows[i][a] = j++
      }
    }

    this.rows = rows;
    console.log(this.rows)
    this.seatsDialog.nativeElement.show();
  }
  closeSeatsModal() {
    this.seatsDialog.nativeElement.close();
  }
  openSeatModification(seat:any) {
    this.seatAddType='edit';
    this.seatToAddtype="Regular";
    this.currentSeatToUpdate=this.currentTheaterSeatsConfiguration.seats.find((elem:any)=>elem.number==seat+1);
    this.addSeatDialog.nativeElement.show();
  }
  openSeatAddingModal() {
    this.seatAddType='add';
    this.seatToAddtype="Regular";
    this.addSeatDialog.nativeElement.show();
  }
  closeAddingSeatModal() {
    this.addSeatDialog.nativeElement.close();
    this.refreshAddingSeatData();
  }
  addSeat() {
    if(this.seatAddType=='add'){
      const seatNumber = this.currentTheaterSeatsConfiguration.number_of_seats + 1;

      let theaterRows = [];
      for (let a = 0; a < Object.keys(this.currentTheaterSeatsConfiguration.seats).length; a++) {
        theaterRows.push(this.currentTheaterSeatsConfiguration.seats[a].row);
      }
      let seatRow = Math.max(...theaterRows);
      if (((seatNumber - 1) / seatRow) == Math.floor((seatNumber - 1) / seatRow)) {
        seatRow++;
      }
      this.seatsService.addSeat({ number: seatNumber, row: seatRow, type: this.seatToAddtype, removable: this.seatToAddRemovable }, this.currentTheaterSeatsConfiguration.id).subscribe((data) => {
      });;
      let currentTheaterFeatures = [];
      for (let i = 0; i < Object.keys(this.currentTheaterSeatsConfiguration.features).length; i++) {
        currentTheaterFeatures.push(this.currentTheaterSeatsConfiguration.features[i].id);
      }
      this.theaterService.updateTheater({ name: this.currentTheaterSeatsConfiguration.name, number_of_seats: this.currentTheaterSeatsConfiguration.number_of_seats + 1, features: currentTheaterFeatures }, this.currentTheaterSeatsConfiguration.id).subscribe(elem => {
        this.currentTheaterSeatsConfiguration.number_of_seats++;
      });
    }else{
      this.seatsService.editSeat({number:this.currentSeatToUpdate.number,row:this.currentSeatToUpdate.row,type:this.seatToAddtype,removable: this.seatToAddRemovable},this.currentTheaterSeatsConfiguration.id,this.currentSeatToUpdate.id).subscribe(data=>{});
    }
   
    this.updateTheatersWrapper();
    this.updateTheatersWrapper();
    this.updateTheatersWrapper();
    this.updateTheatersWrapper();
    this.updateTheatersWrapper();
    this.closeAddingSeatModal();
    this.closeSeatsModal();
  }
  refreshAddingSeatData() {
    this.seatToAddtype = '';
    this.seatToAddRemovable = false;
  }
  makeAnArrayOfFeatures(theater:any){
    let listOfFeatures=[];
    for(let i=0;i<Object.keys(theater.features).length;i++){
      listOfFeatures.push(theater.features[i].name);
    }
    return listOfFeatures;
  }
  
}
