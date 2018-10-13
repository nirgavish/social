import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AuthService} from '../services/auth.service';
import {PostService} from '../services/post.service';
import {GroupService} from '../services/group.service';
import {LanguageService} from '../services/language.service';

@Component({
  template: `
    <div class="row">

      <div class="col-3" *ngIf="authService.identity">

        <ng-container>

          <ul class="nav flex-column">
            <li class="nav-item">
              <a class="nav-link" [routerLink]="['']">
                <i class="fa fa-anchor mr-1"></i>
                <b>{{L('My Feed')}}</b>
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" [routerLink]="['/user/'+authService.identity.id]">
                <app-user-avatar class="mr-1 img-sz-1" [user]="authService.identity"></app-user-avatar>
                <b>{{L('My User Page')}}</b>
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

      <div class="col-{{(authService.identity)?6:9}}">
        <app-post-textarea (postEvent)="refreshFeed()"></app-post-textarea>

        <ng-container *ngIf="authService.identity; else noFeedForUnauthenticatedUsers">
          <app-feed [feed]="feed"></app-feed>
        </ng-container>

        <ng-template #noFeedForUnauthenticatedUsers>
          <div class="alert alert-info">
            Your are currently logged out
          </div>
        </ng-template>

      </div>

      <div class="col-3">
      </div>

    </div>
  `
})

export class HomePageComponent implements OnInit {
  res: Object;
  private groups: Object;
  private feed;
  private L: any;

  constructor(private titleService: Title, private authService: AuthService, private postService: PostService, private groupService: GroupService, private languageService: LanguageService) {
    this.L = languageService.get;
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
