import { Component, OnInit } from '@angular/core';
import {ViewChild,ElementRef} from '@angular/core';
import { ShowsService } from 'src/app/show.service';
//import { TheaterService } from 'src/app/theater.service';
//import { MovieService } from 'src/app/movie.service';
import { MovieService } from 'src/app/movie.service';
import { TheatersService } from 'src/app/theaters.service';
@Component({
  selector: 'app-shedule-control',
  templateUrl: './shedule-control.component.html',
  styleUrls: ['./shedule-control.component.scss']
})
export class SheduleControlComponent implements OnInit {
  @ViewChild('addShowDialog') addShowDialog!: ElementRef<any>;
showsList!:any;
theatersList!:any;
moviesList!:any;
movieShowId!:number;
theaterShowId!:number;
monthOfShow!:number;
dayOfShow!:number;
hoursOfShow!:number;
minutesOfShow!:number;
showDialogType='add';
showToUpdateId!:any;
  constructor(private showsService:ShowsService,private theaterService:TheatersService,private moviesService:MovieService) {
this.update();
  }
openAddShowDialoge(){
  this.showDialogType='add'
  this.addShowDialog.nativeElement.show();
}
addNewShow(){
  if(this.showDialogType=='add'){
    let date=new Date(`2023-${this.monthOfShow}-${this.dayOfShow}`);
    let time=`${this.hoursOfShow}:${this.minutesOfShow}`;
  if(this.movieShowId&&this.theaterShowId&&this.monthOfShow&&this.dayOfShow&&this.hoursOfShow&&this.minutesOfShow){
  this.showsService.addShow({id_movie:this.movieShowId,id_theater:this.theaterShowId,date:date,time:time}).subscribe(data=>{
      this.update();
      this.update();
      this.update();
      this.addShowDialog.nativeElement.close();
    });
  }else{
    alert('Worng data!')
    this.addShowDialog.nativeElement.close();
  }
  }else{
    let date=new Date(`2023-${this.monthOfShow}-${this.dayOfShow}`);
    let time=`${this.hoursOfShow}:${this.minutesOfShow}`;
  if(this.movieShowId&&this.theaterShowId&&this.monthOfShow&&this.dayOfShow&&this.hoursOfShow&&this.minutesOfShow){
  this.showsService.updateShow({id_movie:this.movieShowId,id_theater:this.theaterShowId,date:date,time:time},this.showToUpdateId).subscribe(data=>{
      this.update();
      this.update();
      this.update();
      this.addShowDialog.nativeElement.close();
    });
  }else{
    alert('Worng data!')
    this.addShowDialog.nativeElement.close();
  }
  }
  


  
}
closeAddShowDialoge(){
  this.addShowDialog.nativeElement.close();
}
  ngOnInit(): void {
    this.update();
  }
update(){
  this.showsService.getShows().subscribe(shows=>{
    this.showsList=shows;
    console.log(shows);
  })
  this.moviesService.getMovies().subscribe((movies:any)=>{
    this.moviesList=movies;
  });
  this.theaterService.getTheaters().subscribe(
    (theaters: any) => {
      this.theatersList = theaters;
    }
  )
}
deleteShow(showId:number){
this.showsService.deleteShow(showId).subscribe(data=>{
  this.update();
  this.update();
  this.update(); 
}
 );

}
openShowToUpdateDialog(showId:number){
  this.addShowDialog.nativeElement.show();
  this.showToUpdateId=showId;
  this.showDialogType='update';
}
}
