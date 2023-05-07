import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-manage-movie',
  templateUrl: './manage-movie.component.html',
  styleUrls: ['./manage-movie.component.css']
})

export class ManageMovieComponent {

  constructor(private service: ApiService,private sharedService: SharedService, private router: Router) { }
  name: string='';
  category: string='';
  rating: number=0;
  movieId: string='0';
  CategoryList: any = [];
  errorMessage: string = '';
  successMessage: any = null;

  ngOnInit() {
    
  this.service.getMoviebyId(this.sharedService.getViewMoviesId()).subscribe(
    (response) => {
      this.name = response["name"];
     this.category = response["category"];
     this.rating = response["rating"];
     this.movieId = response["movieID"];

    //this.groupMoviesByRating();
      console.log(response);
    },
    (error) => {
      console.log(error);
    }
  );
  
    // const promise = this.service.getMoviebyId(
    //   this.sharedService.getViewMoviesId()
    // );
    // promise.then(
    //   response => {
    //     this.updateCustomerForm.controls["id"].setValue(response["id"]);
    //     this.movies = response["id"];
    //   },
    //   error => {
    //     console.log("error " + error);
    //   }
    // );
  }


  // addMovie() {
  //   const newMovie = {
  //     id: this.movieId,
  //     name: this.name,
  //     category: this.category,
  //     rating: this.rating
  //   };
  //   console.log('New Movie:', newMovie);
  //   this.service.addMovie(newMovie).subscribe(res => {
  //     alert(res.toString());
  //   });
  //   this.clearForm();
  // }

  addMovie() {
    this.errorMessage = '';
    if (!this.name || !this.category || this.rating < 0 || this.rating > 5) {
      this.errorMessage = 'Please fill in all fields and provide a valid rating.';
      return;
    }
    if (this.name.length > 200 || this.category.length > 200) {
      this.errorMessage = 'Name and category should not exceed 200 characters.';
      return;
    }
 
    const newMovie = {
          id: this.movieId,
          name: this.name,
          category: this.category,
          rating: this.rating
        };
    this.service.addMovie(newMovie)
      .subscribe(data => {
        // handle success
        this.successMessage = 'The Movie has been added successfully';
        this.errorMessage = '';
        this.clearForm();
        this.router.navigate(['/']);
      }, error => {
        // handle error
        this.errorMessage = error.error;
        this.successMessage = '';
      });
  }
  private params: any;


  agInit(params: any): void {
    this.params = params;
  }
  updateMovie() {

    // const selectedData = this.params.api.getSelectedRows();
    // const selectedValue = selectedData[0].movies // Assuming the selected data has a "name" property
    
    const updatedMovie = {
      movieid: this.movieId,
      name: this.name,
      category: this.category,
      rating: this.rating
    };

    this.service.editMovie(updatedMovie)
      .subscribe(data => {
        // handle success
        this.successMessage = 'The Movie has been added successfully';
        this.errorMessage = '';
        this.clearForm();
        this.router.navigate(['/']);
      }, error => {
        // handle error
        this.errorMessage = error.error;
        this.successMessage = '';
      });
  
   // this.clearForm();
  }
  cancelMovie() {
    this.router.navigate(['/']);
  }
  clearForm() {
    this.name = '';
    this.category = '';
    this.rating = 0;
    this.movieId = '0';
  }
}