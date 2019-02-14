import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export class News {
  id: number;
  title: string;
  text: string;
}

const NEWS_RESOURCE_URL = 'http://localhost:8080/news/resources/news';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private httpClient: HttpClient) {}

  create(news: News): Promise<any> {
    return this.httpClient.post(NEWS_RESOURCE_URL, news).toPromise();
  }

  retrieve(id: number): Promise<News> {
    return this.httpClient.get<News>(NEWS_RESOURCE_URL + '/' + id).toPromise();
  }

  update(news: News): Promise<any> {
    return this.httpClient.put(NEWS_RESOURCE_URL + '/' + news.id, news).toPromise();
  }

  delete(id: number): Promise<any> {
    return this.httpClient.delete(NEWS_RESOURCE_URL + '/' + id).toPromise();
  }

  retrieveAll(): Promise<News[]> {
    return this.httpClient.get<News[]>(NEWS_RESOURCE_URL).toPromise();
  }
}
