import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
  <div class="card">
  <div class="card-header">
    {{pageTitle}}
  </div>
  <div class="card-body">
    <div class="container-fluid">

      <div class="text-center">Developed by:</div>
      <div class="text-center">
        <h3>Muhammed Sahin</h3>
      </div>

      <div class="text-center">(c) 2019</div>
      
    </div>
  </div>
</div>
  `,
  styles: []
})
export class HomeComponent implements OnInit {

  public pageTitle = 'Willkommen';

  constructor() { }

  ngOnInit() {
  }

}
