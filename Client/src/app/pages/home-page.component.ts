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

<!--
          <ul class="list-group mb-2">
            <li class="list-group-item">
              <a [routerLink]="['/user/'+authService.identity.id]">
                <app-user-avatar class="mr-1 img-sz-1" [user]="authService.identity"></app-user-avatar>
                <b>My User Page</b>
              </a>
            </li>
          </ul>
-->

<!--
          <ul class="list-group mb-2">
            <li class="list-group-item">
              <a [routerLink]="['']">
                <i class="fa fa-anchor mr-1"></i>
                <b>My Feed</b>
              </a>
            </li>
          </ul>
-->


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

<!--
          <ul class="list-group">
            <li *ngFor="let group of groups" class="list-group-item">
              <a [routerLink]="['/group/'+group.id]">
                &lt;!&ndash;<i class="fa fa-user-friends mr-1"></i>&ndash;&gt;
                <app-group-avatar class="mr-1 img-sz-1" [group]="group"></app-group-avatar>
                {{group.name}}
              </a>
            </li>
          </ul>
-->

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
