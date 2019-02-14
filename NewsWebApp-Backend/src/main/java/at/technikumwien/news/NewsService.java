package at.technikumwien.news;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class NewsService {
	@PersistenceContext
	private EntityManager em;
	
	public List<News> getAllNews() {
		return em.createNamedQuery("News.selectAll", News.class)
			.getResultList();
	}
}