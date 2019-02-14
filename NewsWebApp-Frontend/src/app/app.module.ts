import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NewsComponent } from './news.component';
import { NewsListComponent } from './news-list.component';
import { NewsInputComponent } from './news-input.component';

@NgModule({
  declarations: [ AppComponent, NewsComponent, NewsListComponent, NewsInputComponent ],
  imports: [ BrowserModule, FormsModule, HttpClientModule ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
