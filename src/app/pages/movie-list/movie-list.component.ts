import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ApiService } from '../../api.service';
//import { MovieListModalComponent } from '../movie-list-modal/movie-list-modal.component';
import { GridOptions } from 'ag-grid-community';
import { BtnCellRenderer } from "../../btn-cell-renderer.component";
import { BtnCellRendererView } from "../../btn-cell-rendererView.component";
import { AgGridModule } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
 // View child
 @ViewChild("movieDetail") movieDetail!: TemplateRef<any>;

 // Properties
 movies: any[] = [];
 filteredMovies: any[]= [];
 searchText: string='';
 sortBy: string='';
 ratings: number[] = [1, 2, 3, 4, 5];
 groupedMovies: any[]= [];
 searchValue: string='';
 gridColumnApi: any;
 isAddMode = false;
 isEditMode = false;
 searchQuery: string = '';
 private defaultColDef:any;
 rowData: any[] = [];
 columnDefs: any[]= [];
 gridApi: any;

 // Rating
 movieGroups:any[]= [];
 ratingcolumnDefs:any[]= [];
 movieColumnDefs:any[]= [];

 gridOptions: GridOptions = {
   rowModelType: 'clientSide',
 };

 frameworkComponents: any;
 // Constructor
 constructor(
  private apiService: ApiService, 
  private router: Router, 
  private dialog: MatDialog, 
  private aggridmodule: AgGridModule, 
  private http: HttpClient, 
  public modalService: NgbModal
) {
  
 
   // Define column definitions
   this.columnDefs = [
    { field: "name", sortable: true},
    { field: "category" , sortable: true},
    { 
      field: "rating" , 
      sortable: true
    },
    {
      field: "Action",
      cellRenderer: BtnCellRenderer,
      cellRendererParams: {
        clicked: function(field: any) {
          alert(`${field} was deleted`);
        }
      },
      minWidth: 30
    },
  ];

// Define rating column definitions
  this.movieGroups = [];
  this.ratingcolumnDefs = [
    { field: 'rating', headerName: 'Rating', resizable: true },
    { field: 'count', headerName: 'Count', resizable: true },
    {
      field: "",
      cellRenderer: BtnCellRendererView,
      cellRendererParams: {
        clicked: function(field: any) {
          alert(`${field} was deleted`);
        }
      },
      minWidth: 50
    },
  ];

  // Define movie column definitions
  this.movieColumnDefs = [
    { field: 'name', headerName: 'Name', resizable: true },
    { field: 'category', headerName: 'Category', resizable: true },
    { field: 'rating', headerName: 'Rating', resizable: true },
   
  ];
  
   // Set default col def
  this.defaultColDef = {
    flex: 1,
    minWidth: 100
  };

    // Define framework components
  this.frameworkComponents = {
    btnCellRenderer: BtnCellRenderer, BtnCellRendererView
   
  };
  
 }


ngOnInit() {

  this.apiService.getMovies().subscribe(
    (response) => {
      this.movies = response;
     this.rowData = this.movies;
     this.movieGroups = response;
     this.filteredMovies = response;
    this.groupMoviesByRating();
      console.log(this.movies);
    },
    (error) => {
      console.log(error);
    }
  );

}
openModal() {
  this.modalService.open(this.movieDetail, { size: "lg" });
}


//Search Start
onSearchTextChange() {
  if (this.gridApi) {
    this.gridApi.setQuickFilter(this.searchValue);
  }
}
onGridReady(params:any)
{
  this.gridApi = params.api;
  this.gridColumnApi = params.columnApi;
  this.apiService.getMovies().subscribe(
    (data) => {
      this.rowData = data;
      this.gridApi.setRowData(this.rowData);
    },
    (error) => {
      console.log(error);
    }
  );
}
quickSearch()
{
  this.gridApi.setQuickFilter(this.searchValue);
}

onGridReadyRating(params:any) {
  params.api.sizeColumnsToFit();
}


addMovie() {
  console.log("i clicked add")
  this.router.navigate(['/manage-movie']);
}


groupMoviesByRating() {
  this.groupedMovies = [];
  this.ratings.forEach(rating => {
    const movies = this.filteredMovies.filter(m => m.rating === rating);
    const count = movies.length;
    this.groupedMovies.push({ rating, movies, count });
  });
}

}

