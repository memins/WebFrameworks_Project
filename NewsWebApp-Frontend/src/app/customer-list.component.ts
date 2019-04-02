import { CustomerService, Customer } from "./services";
import { Component, OnInit, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-customer-list",
  template: `
    <table>
      <thead>
        <tr>
          <th>Online Customer:</th>
          <th>
            <input type="checkbox" [(ngModel)]="filteredStatus" (change) = "filterCustomer($event)"/>
          </th>
          <th>Filtert nach: {{ filteredStatus }}</th>
        </tr>
        <tr>
          <th>ID</th>
          <th>Vorname</th>
          <th>Nachname</th>
          <th>Geburtsdatum</th>
          <th>Aktiviert</th>
          <th>
            <button (click)="addCustomer()" class="btn btn-success">
              Kunden hinzufügen
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let customer of customerList">
          <td>{{ customer.id }}</td>
          <td>{{ customer.firstName }}</td>
          <td>{{ customer.lastName }}</td>
          <td>{{ customer.birthDate }}</td>
          <td>{{ customer.active }}</td>
          <td>
            <button (click)="editCustomer(customer)">
              <img src="assets/edit.gif" />
            </button>
            <button (click)="deleteCustomer(customer)">
              <img src="assets/delete.gif" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [
    `
      * {
        margin: 0;
        padding: 0;
      }

      button {
        margin: 5px;
      }

      td {
        text-align: left;
      }

      td:first-of-type {
        text-align: right;
      }

      td,
      th {
        border: 1px solid black;
        padding: 5px;
      }

      th {
        text-align: center;
      }
    `
  ]
})
export class CustomerListComponent implements OnInit {
  @Output() private add = new EventEmitter();
  @Output() private edit = new EventEmitter<number>();
  customerList: Customer[];
  filteredStatus = false;

  constructor(private customerService: CustomerService) {
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    return this.customerService.retrieveAll().then(customerList => {
      this.customerList = customerList;
      console.log(this.customerList);
    });
  }

  private addCustomer() {
    this.add.emit();
  }

  private filterCustomer(status) {
    this.refresh().then(() => {
      this.customerList = this.customerList.filter(customer => {
        return customer.active == this.filteredStatus;
      })
      console.log(this.customerList.length)
    })
  }

  private editCustomer(customer: Customer) {
    console.log(customer);
    this.edit.emit(customer.id);
  }

  private deleteCustomer(customer: Customer) {
    if (confirm("Wollen Sie die News wirklich löschen?")) {
      this.customerService.delete(customer.id).then(() => this.refresh());
    }
  }
}
