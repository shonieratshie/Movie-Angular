import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ConfirmationDialogComponent } from './pages/confirmation-dialog/confirmation-dialog.component';
import { AgGridModule } from 'ag-grid-angular';

import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog'; 
import { AppRoutingModule } from './app-routing.module';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { PagesModule } from './pages/pages.module';
import { ManageMovieComponent } from './pages/manage-movie/manage-movie.component';
import { SharedService } from './shared.service';
import { BtnCellRendererView } from './btn-cell-rendererView.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    ConfirmationDialogComponent,
    MovieListComponent,
    ManageMovieComponent,
    BtnCellRendererView
  ],
  imports: [
    BrowserModule, AgGridModule,FormsModule,HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule, 
    AppRoutingModule,
    PagesModule,
    NgbModule
  ],
    exports: [
      FormsModule,
      ReactiveFormsModule,
      NgModel 
    ],
  providers: [SharedService],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
