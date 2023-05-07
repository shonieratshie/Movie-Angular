import { Component, OnDestroy, ViewChild } from "@angular/core";
import { AgGridModule, ICellRendererAngularComp } from "../../node_modules/ag-grid-angular/public-api";
import { ConfirmationDialogComponent } from "./pages/confirmation-dialog/confirmation-dialog.component";
import { ApiService } from './api.service';
import { SharedService } from "./shared.service";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "btn-cell-renderer-view",
  template: `
    <button class="btn btn-info" (click)="btnViewHandler($event)">View</button>  &nbsp;

    <ng-template #movieDetail let-modal>
  <div class="modal-header">
    <h3 class="modal-title">List of Movies by Ratings</h3>
    <button type="button" class="close" aria-label="Close" (click)="modal.dismiss()">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <ag-grid-angular
      style="width: 100%; height: 300px;"
      class="ag-theme-alpine"
      [rowData]="rowData"
      [columnDefs]="movieColumnDefs">
    </ag-grid-angular>
  </div>
</ng-template>
  `
})
export class BtnCellRendererView implements ICellRendererAngularComp, OnDestroy {
    dialog: any;
    filteredMovies: any;
    movies: any;
    //rating
  movieGroups:any[]= [];
  ratingcolumnDefs:any[]= [];
  movieColumnDefs:any[]= [];
  rowData: any[] = [];
refresh(params: any): boolean {
throw new Error("Method not implemented.");
}
@ViewChild('movieDetail') movieDetail: any;

constructor(private apiService: ApiService,private sharedService: SharedService, private router: Router,private modalService: NgbModal) {
  {
    sharedService.setViewMoviesId(null);
  }

   //Rating
   this.movieGroups = [];
   this.ratingcolumnDefs = [
     { field: 'rating', headerName: 'Rating', resizable: true },
     { field: 'count', headerName: 'Count', resizable: true },
     {
       field: "",
       cellRenderer: BtnCellRendererView,
       cellRendererParams: {
        //  clicked: function(field: any) {
        //    alert(`${field} was deleted`);
        //  },
         onClick: this.btnViewHandler.bind(this),
        label: 'Get ID'
       }
       ,
       minWidth: 50
     },
   ];
   this.movieColumnDefs = [
     { field: 'name', headerName: 'Name', resizable: true },
     { field: 'category', headerName: 'Category', resizable: true },
     { field: 'rating', headerName: 'Rating', resizable: true },
    
   ];
}
  private params: any;


  agInit(params: any): void {
    this.params = params;
  }

  btnViewHandler(event: any) {
    const selectedValue = this.params.data.movies;
    // const selectedData = this.params.api.getSelectedRows();
    // const selectedValue = selectedData[0].movies // Assuming the selected data has a "name" property
    this.movies = selectedValue;
    this.rowData= selectedValue;
    const modalRef = this.modalService.open(this.movieDetail);

  }

 

  ngOnDestroy() {

  }
}
