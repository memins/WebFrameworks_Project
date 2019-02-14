package at.technikumwien.news;

import java.util.List;

import javax.inject.Inject;
import javax.jws.WebService;

@WebService
public class NewsWebService {
	@Inject
	private NewsService newsService;
	
	public List<News> getAllNews() {
		return newsService.getAllNews();
	}
}