package at.technikumwien.news;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class CustomerService {
	@PersistenceContext
	private EntityManager em;
	
	public List<Customer> getAllCustomers() {
		return em.createNamedQuery("Customer.selectAll", Customer.class)
			.getResultList();
	}
}