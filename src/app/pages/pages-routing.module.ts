import { RouterModule, Routes } from "@angular/router";
import { MovieListComponent } from "./movie-list/movie-list.component";
import { NgModule } from "@angular/core";
import { ManageMovieComponent } from "./manage-movie/manage-movie.component";
import { ReportComponent } from "./report/report.component";

const routes: Routes = [
     { path: '', component: MovieListComponent,pathMatch:'full' },
      { path: 'manage-movie', component: ManageMovieComponent,pathMatch:'full' },
      { path: 'report', component: ReportComponent,pathMatch:'full' },
  ];
  @NgModule({

    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
  })
  export class PagesRoutingModule{}