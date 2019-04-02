package at.technikumwien.news;

import java.util.List;

import javax.inject.Inject;
import javax.jws.WebService;

@WebService
public class CustomerWebService {
	@Inject
	private CustomerService customerService;
	
	public List<Customer> getAllCustomers() {
		return customerService.getAllCustomers();
	}
}