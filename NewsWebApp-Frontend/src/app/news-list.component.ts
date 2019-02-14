import { NewsService, News } from "./services";
import { Component, OnInit, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-news-list",
  template: `
  <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Vorname</th>
          <th>Nachname</th>
          <th>Geburtsdatum</th>
          <th>Status</th>
          <th><button (click)="addNews()">Kunden hinzufügen</button></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let news of newsList">
          <td>{{ news.id }}</td>
          <td>{{ news.title }}</td>
          <td>
            <button (click)="editNews(news)">
              <img src="assets/edit.gif" />
            </button>
            <button (click)="deleteNews(news)">
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
export class NewsListComponent implements OnInit {
  @Output() private add = new EventEmitter();
  @Output() private edit = new EventEmitter<number>();
  private newsList: News[];

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.newsService.retrieveAll().then(newsList => (this.newsList = newsList));
  }

  private addNews() {
    this.add.emit();
  }

  private editNews(news: News) {
    this.edit.emit(news.id);
  }

  private deleteNews(news: News) {
    if (confirm("Wollen Sie die News wirklich löschen?")) {
      this.newsService.delete(news.id).then(() => this.refresh());
    }
  }
}
