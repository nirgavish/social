import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {GroupService} from '../services/group.service';

@Component({
  template: `
    <ng-container>

      <div class="row">
        <div class="col-4">

          <div class="card" *ngIf="groupObject">
            <!--<img class="card-img-top" src="https://www.gravatar.com/avatar/35d5f0fd-c65a-4275-9442-2f9029e20211?d=retro" alt="Card image cap">-->
            <app-group-avatar class="card-img-top" [group]="groupObject"></app-group-avatar>

            <div class="card-body">

              <h1 class="card-title">
                {{groupObject.name}}
              </h1>
              <p class="card-text">
                {{groupObject.description}}
                <!--{{groupObject | json}}-->
              </p>

              <p>Founder: </p>
              <ng-container *ngFor="let member of groupMembers">
                <a *ngIf="member.memberType===0" class="small font-weight-bold" [routerLink]="['/user/'+member.user.id]"
                   title="{{member.user.name}}">
                  <app-user-avatar class="mr-1 mb-1 img-sz-2" [user]="member.user"></app-user-avatar>
                </a>
              </ng-container>

              <p>Admins: </p>
              <ng-container *ngFor="let member of groupMembers">
                <a *ngIf="member.memberType===1" class="small font-weight-bold" [routerLink]="['/user/'+member.user.id]"
                   title="{{member.user.name}}">
                  <app-user-avatar class="mr-1 mb-1 img-sz-2" [user]="member.user"></app-user-avatar>
                </a>
              </ng-container>

              <p>Members: </p>
              <ng-container *ngFor="let member of groupMembers">
                <a *ngIf="member.memberType===2" class="small font-weight-bold" [routerLink]="['/user/'+member.user.id]"
                   title="{{member.user.name}}">
                  <app-user-avatar class="mr-1 mb-1 img-sz-2" [user]="member.user"></app-user-avatar>
                </a>
              </ng-container>

              <hr/>
              <a (click)="join()" *ngIf="!groupObject.isMember" href="javascript:;" class="btn btn-primary">Join</a>
              <a (click)="leave()" *ngIf="groupObject.isMember" href="javascript:;" class="btn btn-secondary">Leave</a>

<!--
              <hr/>

              <pre>{{groupMembers | json}}</pre>
-->
            </div>
          </div>

        </div>
        <div class="col-8">

          <app-post-textarea (postEvent)="getFeed(groupId)" [groupId]="groupId"></app-post-textarea>

          <div class="mb-2 card p-2 shadow-sm" *ngFor="let post of groupFeed">
            <app-post [post]="post"></app-post>
          </div>

        </div>
      </div>

    </ng-container>
  `
})

export class GroupPageComponent implements OnInit {
  groupMembers: {};
  groupFeed: Object;
  private groupId: any;
  private groupObject: Object;

  constructor(private route: ActivatedRoute, private titleService: Title, private groupService: GroupService) {
  }

  join() {
    this.groupService.join(this.groupObject['id']);
    this.groupObject['isMember'] = true;
  }

  leave(state: boolean) {
    this.groupService.leave(this.groupObject['id']);
    this.groupObject['isMember'] = false;
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.groupId = params.id;
      this.getGroup(params.id);
      this.getFeed(params.id);
      this.getMembers(params.id);
    });
  }

  async getFeed(groupId) {
    this.groupFeed = await this.groupService.getFeed(groupId);
  }

  async getMembers(groupId) {
    this.groupMembers = await this.groupService.getMembers(groupId);
  }

  async getGroup(groupId) {
    this.groupObject = await this.groupService.get(groupId);
    this.titleService.setTitle(this.groupObject['name']);
  }

}
