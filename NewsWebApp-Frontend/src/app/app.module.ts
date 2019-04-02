import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { NewsComponent } from "./customer.component";
import { CustomerListComponent } from "./customer-list.component";
import { CustomerInputComponent } from "./customer-input.component";
import { FilterPipe } from "./filter.pipe";
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    CustomerListComponent,
    CustomerInputComponent,
    FilterPipe,
    HomeComponent
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
