import { Component, OnInit } from '@angular/core';
//import { MovieService } from 'src/app/movie.service';
import {ViewChild,ElementRef} from '@angular/core';
import { ReviewsEService } from 'src/app/reviewE.service';
import { MovieEService } from 'src/app/movieE.service';
@Component({
  selector: 'app-movie-control',
  templateUrl: './movie-control.component.html',
  styleUrls: ['./movie-control.component.scss']
})
export class MovieControlComponent implements OnInit {
  @ViewChild('addMovieDialog') addMovieDialog!: ElementRef<any>;
  @ViewChild('reviewsDialog') reviewsDialog!: ElementRef<any>;
  dialogType='add';
  newMovieName!:string;
  newMovieDescription!:string;
moviesList!:any;
newMovieMinimumAge!:number;
newMovieDuration!:number;
currentReviesList!:any;
updatingMovieId!:number;
  constructor(private movieService:MovieEService,private reviewsService:ReviewsEService) {
this.updateMoviesWrapper();
setTimeout(()=>{
  console.log(this.moviesList);
},200);

   }
async updateMovies(){
 return await new Promise((resolve,reject)=>{
  this.movieService.getMovies().subscribe(movies=>{
    this.moviesList=movies;
    resolve('succes');
  }); 
 });
  
}
async updateMoviesWrapper(){
  await this.updateMovies();
}
openAddMovieDialog(){
  this.dialogType='add';
  this.addMovieDialog.nativeElement.show();
}
updateMovieDialogOpen(id:number){
  this.dialogType='edit';
this.updatingMovieId=id;
  this.addMovieDialog.nativeElement.show();
}
closeMovieAddDialog(){
  this.refreshMovieAddData();
  this.addMovieDialog.nativeElement.close();
}
refreshMovieAddData(){
  this.newMovieName='';
  this.newMovieDescription='';
  this.newMovieDuration=0;
this.newMovieMinimumAge=0;
}
addNewMovie(){
  if(this.dialogType=='add'){
    if(this.newMovieName!=''&&this.newMovieDuration!=0&&this.newMovieDescription!=''&&this.newMovieMinimumAge!=0){
      this.movieService.addMovie({name:this.newMovieName,description:this.newMovieDescription,duration:this.newMovieDuration,age:this.newMovieMinimumAge}).subscribe(data=>{
        this.updateMoviesWrapper();
        this.closeMovieAddDialog();
      });
    }
    this.updateMoviesWrapper();
    this.closeMovieAddDialog();
  }else{
    if(this.newMovieName!=''&&this.newMovieDuration!=0&&this.newMovieDescription!=''&&this.newMovieMinimumAge!=0){
this.movieService.editMovie({name:this.newMovieName,description:this.newMovieDescription,duration:this.newMovieDuration,age:this.newMovieMinimumAge},this.updatingMovieId).subscribe(data=>{
  this.updateMoviesWrapper();
        this.closeMovieAddDialog();
});
this.updateMoviesWrapper();
    this.closeMovieAddDialog();
    }
  }

}
deleteMovie(movieId:any){
this.movieService.deleteMovie(movieId).subscribe(data=>{
  this.updateMoviesWrapper();
});
}
openReviewsModal(movieId:number){
this.reviewsService.getReview(movieId).subscribe(reviews=>{
  this.currentReviesList=reviews;
  console.log(reviews);
this.reviewsDialog.nativeElement.show();
});
}
closeReviewsDialog(){
  this.reviewsDialog.nativeElement.close();
}

  ngOnInit(): void {
  }

}
