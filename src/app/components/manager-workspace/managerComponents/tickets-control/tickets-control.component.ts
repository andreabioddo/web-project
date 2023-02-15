import { Component, OnInit } from '@angular/core';
import { TicketsEService } from 'src/app/ticketsE.service';
import { TheatersEService } from 'src/app/theatersE.service';
import { MovieEService } from 'src/app/movieE.service';
import { ViewChild, ElementRef } from '@angular/core';
import { UsersEEService } from 'src/app/userE.service';
import { ShowsEService } from 'src/app/showE.service';
@Component({
  selector: 'app-tickets-control',
  templateUrl: './tickets-control.component.html',
  styleUrls: ['./tickets-control.component.scss']
})
export class TicketsControlComponent implements OnInit {
  @ViewChild('addTicketDialog') addTicketDialog!: ElementRef<any>;
  moviesList!: any;
  theatersList!: any;
  usersList!: any;
  chosenTheaterId!: any;
  chosenMovieId!: any;
  chosenUserId!: any;
  theatersSeats!: any;
  currentTheaterSeats!: any;
  chosenSeatId!: any;
  ticketsList!:any;
  showsList!:any;
  chosenShowId!:any;
  constructor(private ticketService: TicketsEService, private theatersService: TheatersEService, private movieService: MovieEService, private usersService: UsersEEService,private showsService:ShowsEService) {
    
    
    this.update();
  }
  update() {
    this.showsService.getShows().subscribe(shows=>{
      this.showsList=shows;
    })
    this.movieService.getMovies().subscribe(movies => {
      this.moviesList = movies;
    })
    this.usersService.getUsers().subscribe(users => {
      this.usersList = users;
    })
    this.theatersService.getTheaters().subscribe(theaters => {
      this.theatersList = theaters;
    });
    this.ticketService.getTickets().subscribe(tickets => {
      this.ticketsList=tickets;
      console.log(tickets);
    });
  }

  ngOnInit(): void {
  }
  openTicketAdd() {
    this.addTicketDialog.nativeElement.show();
  }
  returnTicket(id:number){
this.ticketService.deleteTicket(id).subscribe(data=>{
  
});
  }
  closeTicketAdd(){
    this.addTicketDialog.nativeElement.close();
  }
  
  addTicket() {
  if(this.chosenSeatId&&this.chosenShowId&&this.chosenUserId){
    if(!this.ticketsList.find((elem:any)=>{
      if((elem.id_seat==this.chosenSeatId)&&(elem.id_show==this.chosenShowId)){
        return true;
      }else{
        return false;
      }
    })){
      this.ticketService.addTicket({price:40,id_seat:this.chosenSeatId,id_user:this.chosenUserId,id_show:this.chosenShowId}).subscribe(data=>{
        this.update();
        this.update();
            });
    }
    
  }
  this.update();
  this.update();
  this.addTicketDialog.nativeElement.close();
  }
  setSeatsForTheater() {
    
    if (this.chosenShowId) {
      setTimeout(() => {
      let cinema=0;
      
cinema=this.showsList.find((elem:any)=>{
 return this.chosenShowId==elem.id;
}).id_theater;
        this.currentTheaterSeats = (this.theatersList.find((elem: any) => {

          return elem.id == cinema;
        })).seats;
        
      }, 200);
      this.update();
      this.update();
      this.update();
      this.update();
    }
    

    


    this.update();
    this.update();
    this.update();
    this.update();

  }
}
