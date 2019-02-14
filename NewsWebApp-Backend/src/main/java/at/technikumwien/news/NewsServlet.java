package at.technikumwien.news;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(urlPatterns = "/newsservlet")
@SuppressWarnings("serial")
public class NewsServlet extends HttpServlet {
	@Inject
	private NewsService newsService;
	
	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		
		StringBuilder html = new StringBuilder(
			"<!DOCTYPE html>" +
			"<html>" +
			"<head>" +
			"<meta charset='UTF-8'>" +
			"<title>News</title>" +
			"</head>" +
			"<body>" +
			"<h1>News</h1>"
		);
		
		List<News> newsList = newsService.getAllNews();
		
		for (News news : newsList) {
			html.append(
				"<h2>" + news.getTitle() + "</h2>" +
				"<p>" + news.getText() + "</p>"
			);
		}
		
		html.append(
			"</body>" +
			"</html>"
		);
		
		out.println(html.toString());
	}
}