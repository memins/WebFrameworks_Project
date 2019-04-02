import { Component } from "@angular/core";

@Component({
  selector: "app-news",
  template: `
    
    <h1>Kunden Management</h1>
    <app-customer-list #list (add)="input.startAddingCustomer()" (edit)="input.startEditingCustomer($event)"></app-customer-list>
    <app-customer-input #input (ok)="list.refresh()"></app-customer-input>
    
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
export class NewsComponent { }
