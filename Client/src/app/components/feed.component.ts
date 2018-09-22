import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-feed',
  template: `
    <ng-container *ngIf="feed">
      <ng-container *ngIf="feed.length > 0; else emptyFeed">
        <div class="mb-2 card p-2 shadow-sm" *ngFor="let post of feed">
          <app-post [post]="post"></app-post>
        </div>
      </ng-container>
    </ng-container>

    <ng-template #emptyFeed>
      <div class="alert alert-warning">
        This feed is currently empty
      </div>
    </ng-template>
  `,
  styles: [`
  `]
})
export class FeedComponent implements OnInit {

  @Input() feed;

  constructor() { }

  ngOnInit() {
  }

}
