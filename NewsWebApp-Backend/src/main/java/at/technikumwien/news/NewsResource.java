package at.technikumwien.news;

import java.net.URI;
import java.util.List;
import java.util.logging.Logger;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.core.Response.Status;

@Path("/news")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class NewsResource {
	private static final Logger LOGGER = Logger.getLogger(NewsResource.class.getName()); 
	
	@PersistenceContext
	private EntityManager em;
	@Inject
	private NewsService newsService;
	@Context
	private UriInfo uriInfo;
	
	@POST
	@Transactional
	public Response create(News news) {
		LOGGER.info("create >> news=" + news);
		
		em.persist(news);
		URI uri = uriInfo.getAbsolutePathBuilder().path(news.getId().toString()).build();
		return Response.created(uri).build();
	}
	
	@GET
	@Path("/{id}")
	public News retrieve(@PathParam("id") long id) {
		LOGGER.info("retrieve >> id=" + id);
		
		return em.find(News.class, id);
	}
	
	@PUT
	@Path("/{id}")
	@Transactional
	public void update(@PathParam("id") long id, News newsNew) {
		LOGGER.info("update >> id=" + id + ", news=" + newsNew);

		News newsOld = em.find(News.class, id);
		if (newsOld != null) {
			newsOld.setTitle(newsNew.getTitle());
			newsOld.setText(newsNew.getText());
		}
		else {
			throw new WebApplicationException(Status.NOT_FOUND);
		}
	}
	
	@DELETE
	@Path("/{id}")
	@Transactional
	public void delete(@PathParam("id") long id) {
		LOGGER.info("delete >> id=" + id);
		
		News news = em.find(News.class, id);
		if (news != null) {
			em.remove(news);
		}
		else {
			throw new WebApplicationException(Status.NOT_FOUND);
		}
	}	
	
	@GET
	public List<News> retrieveAll() {
		LOGGER.info("retrieveAll");

		return newsService.getAllNews();  
	}
}