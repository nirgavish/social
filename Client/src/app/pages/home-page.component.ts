import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AuthService} from '../services/auth.service';
import {PostService} from '../services/post.service';
import {GroupService} from '../services/group.service';

@Component({
  template: `
    <div class="row">

      <div class="col-4" *ngIf="authService.identity">

        <ng-container>

          <ul class="nav flex-column">
            <li class="nav-item">
              <a class="nav-link" [routerLink]="['']">
                <i class="fa fa-anchor mr-1"></i>
                <b>My Feed</b>
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" [routerLink]="['/user/'+authService.identity.id]">
                <app-user-avatar class="mr-1 img-sz-1" [user]="authService.identity"></app-user-avatar>
                <b>My User Page</b>
              </a>
            </li>
          </ul>

          <ul class="nav flex-column">
            <li class="nav-item" *ngFor="let group of groups">
              <a class="nav-link" [routerLink]="['/group/'+group.id]">
                <app-group-avatar class="mr-1 img-sz-1" [group]="group"></app-group-avatar>
                {{group.name}}
              </a>
            </li>
          </ul>
        </ng-container>

      </div>

      <div class="col-{{(authService.identity)?8:12}}">
        <app-post-textarea (postEvent)="refreshFeed()"></app-post-textarea>

        <ng-container *ngIf="authService.identity; else noFeed">
          <ng-container *ngIf="feed && feed.length > 0; else emptyFeed">
            <div class="mb-2 card p-2 shadow-sm" *ngFor="let post of feed">
              <app-post [post]="post"></app-post>
            </div>
          </ng-container>
        </ng-container>

        <ng-template #noFeed>
          <div class="alert alert-info">
            Your are currently logged out
          </div>
        </ng-template>

        <ng-template #emptyFeed>
          <div class="alert alert-warning">
            Your feed is currently empty
          </div>
<!--
          <h2>People you may find interesting:</h2>
          <h2>Popular groups:</h2>
-->

        </ng-template>

      </div>

    </div>
  `
})

export class HomePageComponent implements OnInit {
  res: Object;
  private groups: Object;
  private feed: Object;

  constructor(private titleService: Title, private authService: AuthService, private postService: PostService, private groupService: GroupService) {
  }

  ngOnInit() {
    this.titleService.setTitle('Home');
    this.refreshFeed();
    this.refreshGroups();
  }

  async refreshGroups() {
    this.groups = await this.groupService.list();
  }

  async refreshFeed() {
    this.feed = await this.postService.list();
  }

}
