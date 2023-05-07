import { NgModule } from "@angular/core";
import { FormsModule, NgModel, ReactiveFormsModule } from "@angular/forms";
import { PagesRoutingModule } from "./pages-routing.module";
import { CommonModule } from "@angular/common";
import { LoadingComponent } from './loading/loading.component';

@NgModule({
    declarations: [
    LoadingComponent,
  ],
    imports: [
      CommonModule,
      PagesRoutingModule,
      FormsModule,
      ReactiveFormsModule,
    ],
    exports: [
      FormsModule,
      ReactiveFormsModule,
      NgModel 
    ]
  })
  export class PagesModule { }