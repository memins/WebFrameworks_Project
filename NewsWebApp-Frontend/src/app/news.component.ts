import { Component } from "@angular/core";

@Component({
  selector: "app-news",
  template: `
    
    <h1>Kundenverwaltung</h1>
    <app-news-list #list (add)="input.startAddingNews()" (edit)="input.startEditingNews($event)"></app-news-list>
    <app-news-input #input (ok)="list.refresh()"></app-news-input>
    
  `,
  styles: [
    `
      * {
        margin: 0;
        padding: 0;
      }

      h1 {
        margin: 10px 0;
      }
    `
  ]
})
export class NewsComponent {}
