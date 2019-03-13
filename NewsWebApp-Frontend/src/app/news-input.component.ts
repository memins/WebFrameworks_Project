import { Component, Output, EventEmitter } from "@angular/core";
import { News, NewsService } from "./services";

@Component({
  selector: "app-news-input",
  template: `
    <form *ngIf="news" novalidate #form="ngForm">
      <h2>{{ news.id ? "Bearbeite Kunde" : "Füge Kunden hinzu" }} ...</h2>
      <p *ngIf="news.id">
        <label for="id">ID:</label>
        <input type="number" [value]="news.id" id="id" name="id" readonly />
      </p>
      <p>
        <label for="title">Vorname:</label>
        <input
          [(ngModel)]="news.firstName"
          id="firstName"
          name="firstName"
          required
          minlength="2"
        />
      </p>
      <p>
        <label for="title">Nachname:</label>
        <input
          [(ngModel)]="news.lastName"
          id="lastName"
          name="lastName"
          required
          minlength="2"
        />
      </p>
      <p>
        <label for="birthDate">Geburtstag:</label>
        <input
          [(ngModel)]="news.birthDate"
          id="birthDate"
          type="date"
          name="birthDate"
          value="{{ news.birthDate }}"
          required
        />
      </p>
      <p>
        <label for="active">Aktiviert:</label>
        <input
          [(ngModel)]="news.active"
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
export class NewsInputComponent {
  @Output() ok = new EventEmitter<News>();
  @Output() cancel = new EventEmitter();
  news: News;

  constructor(private newsService: NewsService) {}

  startAddingNews() {
    console.log("start adding", this.news);
    this.news = new News();
  }

  startEditingNews(id: number) {
    console.log("start editing");
    this.newsService.retrieve(id).then(news => (this.news = news));
  }

  setBirthDate() {
    console.log("bday");
    this.news.birthDate = new Date();
  }

  finishWithOk() {
    console.log("finishing");
    this.createOrUpdate().then(() => {
      this.ok.emit(this.news);
      this.news = null;
    });
  }

  finishWithCancel() {
    this.cancel.emit();
    this.news = null;
  }

  createOrUpdate() {
    if (this.news.id) {
      return this.newsService.update(this.news);
    } else {
      return this.newsService.create(this.news);
    }
  }
}
