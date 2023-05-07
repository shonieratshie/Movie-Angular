import { Component, OnDestroy, ViewChild } from "@angular/core";
import { ICellRendererAngularComp } from "../../node_modules/ag-grid-angular/public-api";
import { ConfirmationDialogComponent } from "./pages/confirmation-dialog/confirmation-dialog.component";
import { ApiService } from './api.service';
import { SharedService } from "./shared.service";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "btn-cell-renderer",
  template: `
    <button class="btn btn-danger" (click)="btnDeleteHandler($event)">Delete</button>  &nbsp;
    <button class="btn btn-warning" (click)="btnEditHandler($event)">Edit</button>

  <ng-template #movieDelete let-modal>
  <div class="modal-header">
  <h3 class="modal-title">Delete Movie</h3>
    <button type="button" class="close" aria-label="Close" (click)="modal.dismiss()">
        <span aria-hidden="true">&times;</span>
      </button>
  </div>
  <div class="modal-body">
  <h4>Are you sure you want to delete this movie?</h4>
  <button class="btn btn-warning" (click)="btnCancelHandler()">No</button>&nbsp;
  <button class="btn btn-success" (click)="btnConfirmDeleteHandler()">Yes</button>
  </div>
</ng-template>
  `
})
export class BtnCellRenderer implements ICellRendererAngularComp, OnDestroy {
    dialog: any;
    filteredMovies: any;
    movies: any;
    movieID = 0;
    isrefresh: boolean = false;
refresh(params: any): boolean {
throw new Error("Method not implemented.");
}

@ViewChild('movieDelete') movieDelete: any;

constructor(private apiService: ApiService,private sharedService: SharedService, private router: Router,private modalService: NgbModal) {
  {
    sharedService.setViewMoviesId(null);
  }
   }
  private params: any;

  agInit(params: any): void {
    this.params = params;
  }

  // btnClickedHandler(event:any) {
  //   let selectedData = this.params.api.getSelectedRows();
  //   console.log(selectedData);
  //   this.params.api.updateRowData({remove: selectedData})
  // }

  btnDeleteHandler(event: any) {
    const selectedValue = this.params.data.movieID;
    // const selectedData = this.params.api.getSelectedRows();
    // const selectedValue = selectedData[0].movieID // Assuming the selected data has a "name" property
    this.movieID = selectedValue;
    const modalRef = this.modalService.open(this.movieDelete);
  }

  btnConfirmDeleteHandler() {
    
    //const modalRef = this.modalService.open(this.movieID);
    this.apiService.deleteMovie(this.movieID).subscribe(() => {
     
    });

    window.location.reload();
  }

  btnEditHandler(event: any) {
    const selectedValue = this.params.data.movieID;
    // const selectedData = this.params.api.getSelectedRows();
    // const selectedValue = selectedData[0].movieID // Assuming the selected data has a "name" property
    // console.log(selectedValue);
    this.sharedService.setViewMoviesId(selectedValue);
    this.router.navigate(["/manage-movie"]);
  }
  deleteMovie(movie: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: `Are you sure you want to delete ${movie.name}?` }
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'confirm') {
        this.apiService.deleteMovie(movie.movieID).subscribe(() => {
          this.movies = this.movies.filter((m: { movieID: any; }) => m.movieID !== movie.movieID);
          this.filteredMovies = this.filteredMovies.filter((m: { movieID: any; }) => m.movieID !== movie.movieID);
          //this.groupMoviesByRating();
        });
      }
    });
  }

  btnCancelHandler() {
   // this.router.navigate(["/"]);
   //this.dialog.close();
   
   const modalRef = this.modalService.dismissAll(this.movieDelete);
    this.isrefresh = !this.refresh;
  }
  ngOnDestroy() {
    // no need to remove the button click handler
    // https://stackoverflow.com/questions/49083993/does-angular-automatically-remove-template-event-listeners
  }


}
