import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

console.log("Ryert")
const routes: Routes = [
    //{ path: '', component: AppComponent },
    //{ path: '', component: MovieListComponent,loadChildren:()=>import('./pages/pages.module').then(m=>m.PagesModule) },
    // other routes here
  ];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
