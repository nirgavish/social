import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/user.service';

@Component({
  template: `
    <ng-container>

      <div class="row">
        <div class="col-4">

          <div class="card" *ngIf="userObject">
            <app-user-avatar class="card-img-top" [user]="userObject" [link]="false"></app-user-avatar>
            <div class="card-body">
              <h1 class="card-title">
                {{userObject.name}}
              </h1>
              <div class="card-text">
                <h6>Followers: <b>{{userObject.followerCount}}</b></h6>
                <h6>Following: <b>{{userObject.followingCount}}</b></h6>
                <h6>Public Groups</h6>
                <!--<pre>{{userObject | json}}</pre>-->
              </div>

              <ng-container *ngIf="userCanBeFollowed()">
                <a (click)="unfollow()" *ngIf="userObject.following" href="javascript:;" class="btn btn-secondary">Unfollow</a>
                <a (click)="follow()" *ngIf="!userObject.following" href="javascript:;" class="btn btn-primary">Follow</a>
              </ng-container>

            </div>
          </div>

        </div>
        <div class="col-8">

          <ng-container *ngIf="userFeed">
            <app-post-textarea *ngIf="userObject && userObject.id===authService.identity?.id" (postEvent)="getFeed(userObject.id)"></app-post-textarea>
            <app-feed [feed]="userFeed"></app-feed>
          </ng-container>

        </div>
      </div>

    </ng-container>
  `
})

export class UserPageComponent implements OnInit {
  userFeed: Object;
  private userObject: Object;

  constructor(private route: ActivatedRoute, private titleService: Title, private authService: AuthService, private userService: UserService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.id !== undefined) {
        this.getUser(params.id);
        this.getFeed(params.id);
      }
    });
  }

  async getUser(userId) {
    this.userObject = await this.userService.get(userId);
    this.titleService.setTitle(this.userObject['name']);
  }

  async getFeed(userId) {
    this.userFeed = await this.userService.getFeed(userId);
  }

  unfollow() {
    this.userService.unfollow(this.userObject['id']);
    this.userObject['following'] = false;
  }

  follow(state: boolean) {
    this.userService.follow(this.userObject['id']);
    this.userObject['following'] = true;
  }

  userCanBeFollowed() {
    return (this.userObject && this.authService.identity && this.userObject['id'] !== this.authService.identity['id']);
  }

}
