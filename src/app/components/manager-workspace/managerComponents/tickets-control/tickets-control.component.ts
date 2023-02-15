import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/ticket.service';
import { TheatersService } from 'src/app/theaters.service';
import { MovieService } from 'src/app/movie.service';
import { ViewChild, ElementRef } from '@angular/core';
import { ShowsService } from 'src/app/show.service';
import { UsersService } from 'src/app/user.service';
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
  constructor(private ticketService: TicketService, private theatersService: TheatersService, private movieService: MovieService, private usersService: UsersService,private showsService:ShowsService) {
    
    
    this.update();
  }
  update() {
    this.showsService.getShows().subscribe(shows=>{
      this.showsList=shows;
    })
    this.movieService.getMovies().subscribe(movies => {
      this.moviesList = movies;
    })
    this.usersService.getUsers().subscribe((users:any) => {
      this.usersList = users;
    })
    this.theatersService.getTheaters().subscribe((theaters:any) => {
      this.theatersList = theaters;
    });
    this.ticketService.getTickets().subscribe((tickets:any) => {
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
this.ticketService.deleteTicket(id).subscribe((data:any)=>{
  
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
      this.ticketService.addTicket({price:40,id_seat:this.chosenSeatId,id_user:this.chosenUserId,id_show:this.chosenShowId}).subscribe((data:any)=>{
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
