import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AuthService} from '../services/auth.service';
import {PostService} from '../services/post.service';
import {GroupService} from '../services/group.service';

@Component({
  template: `
    <div class="row">

      <div class="col-4">
        <div *ngIf="authService.identity">

          <ul class="list-group mb-2">
            <li class="list-group-item">
              <a [routerLink]="['']">
                <i class="fa fa-anchor mr-1"></i>
                <b>My Feed</b>
              </a>
            </li>
            <li class="list-group-item">
              <a [routerLink]="['/user/'+authService.identity.id]">
                <i class="fa fa-user mr-1"></i>
                <b>My User Page</b>
              </a>
            </li>
          </ul>

          <ul class="list-group">
            <li *ngFor="let group of groups" class="list-group-item">
              <a [routerLink]="['/group/'+group.id]">
                <i class="fa fa-user-friends mr-1"></i>
                {{group.name}}
              </a>
            </li>
          </ul>

        </div>
      </div>

      <div class="col-8">
        <app-post-textarea (postEvent)="refreshFeed()"></app-post-textarea>
        <div class="mb-2 card p-2 shadow-sm" *ngFor="let post of feed">
          <app-post [post]="post"></app-post>
        </div>
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
