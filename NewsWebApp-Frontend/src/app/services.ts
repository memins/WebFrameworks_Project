import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export class Customer {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
  active: boolean = false;
}

const NEWS_RESOURCE_URL = "http://localhost:8080/customer/resources/customer";

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private httpClient: HttpClient) { }

  create(customer: Customer): Promise<any> {
    return this.httpClient.post(NEWS_RESOURCE_URL, customer).toPromise();
  }

  retrieve(id: number): Promise<Customer> {
    return this.httpClient.get<Customer>(NEWS_RESOURCE_URL + '/' + id).toPromise();
  }

  update(customer: Customer): Promise<any> {
    return this.httpClient.put(NEWS_RESOURCE_URL + '/' + customer.id, customer).toPromise();
  }

  delete(id: number): Promise<any> {
    return this.httpClient.delete(NEWS_RESOURCE_URL + '/' + id).toPromise();
  }

  retrieveAll(): Promise<Customer[]> {
    return this.httpClient.get<Customer[]>(NEWS_RESOURCE_URL).toPromise();
  }
}
