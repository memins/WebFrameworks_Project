import { Component, Output, EventEmitter } from "@angular/core";
import { Customer, CustomerService } from "./services";

@Component({
  selector: "app-customer-input",
  template: `
    <form *ngIf="customer" novalidate #form="ngForm">
      <h2>{{ customer.id ? "Bearbeite Kunde" : "Füge Kunden hinzu" }} ...</h2>
      <p *ngIf="customer.id">
        <label for="id">ID:</label>
        <input type="number" [value]="customer.id" id="id" name="id" readonly />
      </p>
      <p>
        <label for="title">Vorname:</label>
        <input
          [(ngModel)]="customer.firstName"
          id="firstName"
          name="firstName"
          required
          minlength="2"
        />
      </p>
      <p>
        <label for="title">Nachname:</label>
        <input
          [(ngModel)]="customer.lastName"
          id="lastName"
          name="lastName"
          required
          minlength="2"
        />
      </p>
      <p>
        <label for="birthDate">Geburtstag:</label>
        <input
          [(ngModel)]="customer.birthDate"
          id="birthDate"
          type="date"
          name="birthDate"
          value="{{ customer.birthDate }}"
          required
        />
      </p>
      <p>
        <label for="active">Aktiviert:</label>
        <input
          [(ngModel)]="customer.active"
          id="active"
          type="checkbox"
          name="active"
        />
      </p>
      <p>
        <button
          *ngIf="form.valid"
          (click)="finishWithOk()"
          class="btn btn-success"
        >
          Ok
        </button>
        <button (click)="finishWithCancel()" class="btn btn-danger">
          Abbrechen
        </button>
      </p>
    </form>
  `,
  styles: [
    `
      * {
        margin: 0;
        padding: 0;
      }

      button,
      input,
      textarea {
        margin: 5px;
      }

      form {
        margin-top: 10px;
      }

      h2 {
        margin: 10px 0;
      }

      label {
        display: inline-block;
        vertical-align: top;
        width: 100px;
      }
    `
  ]
})
export class CustomerInputComponent {
  @Output() ok = new EventEmitter<Customer>();
  @Output() cancel = new EventEmitter();
  customer: Customer;

  constructor(private customerService: CustomerService) { }

  startAddingCustomer() {
    console.log("start adding", this.customer);
    this.customer = new Customer();
  }

  startEditingCustomer(id: number) {
    console.log("start editing");
    this.customerService.retrieve(id).then(customer => (this.customer = customer));
  }

  setBirthDate() {
    console.log("bday");
    this.customer.birthDate = new Date();
  }

  finishWithOk() {
    console.log("finishing");
    this.createOrUpdate().then(() => {
      this.ok.emit(this.customer);
      this.customer = null;
    });
  }

  finishWithCancel() {
    this.cancel.emit();
    this.customer = null;
  }

  createOrUpdate() {
    if (this.customer.id) {
      return this.customerService.update(this.customer);
    } else {
      return this.customerService.create(this.customer);
    }
  }
}
