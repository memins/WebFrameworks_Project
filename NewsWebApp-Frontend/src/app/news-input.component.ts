import { Component, Output, EventEmitter } from '@angular/core';
import { News, NewsService } from './services';

@Component({
  selector: 'app-news-input',
  template: `
    <form *ngIf="news" novalidate #form="ngForm">
      <h2>{{news.id ? 'Bearbeite News' : 'Füge News hinzu'}} ...</h2>
      <p *ngIf="news.id">
        <label for="id">ID:</label>
        <input type="number" [value]="news.id" id="id" name="id" readonly>
      </p>
      <p>
        <label for="title">Titel:</label>
        <input [(ngModel)]="news.title" id="title" name="title" required minlength="2">
      </p>
      <p>
        <label for="title">Text:</label>
        <textarea [(ngModel)]="news.text" id="text" name="text" required minlength="5"></textarea>
      </p>
      <p>
        <button *ngIf="form.valid" (click)="finishWithOk()">Ok</button>
        <button (click)="finishWithCancel()">Abbrechen</button>
      </p>
    </form>
  `,
  styles: [`
    * {
      margin: 0;
      padding: 0;
    }

    button, input, textarea {
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
      width: 50px;
    }

	textarea {
	  height: 100px;
	  width: 500px;
	}	
  `]
})
export class NewsInputComponent {
  @Output() ok = new EventEmitter<News>();
  @Output() cancel = new EventEmitter();
  news: News;

  constructor(private newsService: NewsService) { }

  startAddingNews() {
    this.news = new News();
  }

  startEditingNews(id: number) {
    this.newsService.retrieve(id).then(
      news => this.news = news
    );
  }

  finishWithOk() {
    this.createOrUpdate().then(
      () => {
        this.ok.emit(this.news);
        this.news = null;
      }
    );
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
