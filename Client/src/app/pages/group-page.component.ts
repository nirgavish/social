import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {GroupService} from '../services/group.service';

@Component({
  template: `
    <ng-container>

      <div class="row">
        <div class="col-3">

          <div class="card" *ngIf="groupObject">
            <!--<img class="card-img-top" src="https://www.gravatar.com/avatar/35d5f0fd-c65a-4275-9442-2f9029e20211?d=retro" alt="Card image cap">-->
            <div class="card-body">
              <h1 class="card-title">
                {{groupObject.name}}
              </h1>
              <p class="card-text">
                {{groupObject.description}}
                <!--{{groupObject | json}}-->
              </p>
              <p>Admins: </p>
              <p>Members: </p>

              <a (click)="join()" *ngIf="!groupObject.isMember" href="javascript:;" class="btn btn-primary">Join</a>
              <a (click)="leave()" *ngIf="groupObject.isMember" href="javascript:;" class="btn btn-secondary">Leave</a>

            </div>
          </div>

        </div>
        <div class="col-9">

          <app-post-textarea (postEvent)="getFeed(groupId)" [groupId]="groupId"></app-post-textarea>

          <div class="mb-5" *ngFor="let post of groupFeed">
            <app-post [post]="post"></app-post>
          </div>

        </div>
      </div>

    </ng-container>
  `
})

export class GroupPageComponent implements OnInit {
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
    });
  }

  async getFeed(groupId) {
    this.groupFeed = await this.groupService.getFeed(groupId);
  }

  async getGroup(groupId) {
    this.groupObject = await this.groupService.get(groupId);
    this.titleService.setTitle(this.groupObject['name']);
  }

}
